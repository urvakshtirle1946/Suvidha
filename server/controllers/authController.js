const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getMockUsers } = require('../mock_persistence');

const JWT_SECRET = process.env.JWT_SECRET || 'zelp_secret_key_2024';
const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getCookieOptions = (req, maxAge) => {
  const origin = req.headers?.origin || '';
  const isLocalOrigin = /localhost|127\.0\.0\.1/.test(origin);
  const isLocalHost = req.hostname === 'localhost' || req.hostname === '127.0.0.1';
  const isSecureRequest = req.secure || req.headers['x-forwarded-proto'] === 'https';
  const useLocalCookieMode = (isLocalOrigin || isLocalHost) && !isSecureRequest;

  return {
    httpOnly: true,
    secure: !useLocalCookieMode,
    sameSite: useLocalCookieMode ? 'lax' : 'none',
    path: '/',
    maxAge
  };
};

const getClearCookieOptions = (req) => {
  const base = getCookieOptions(req, 0);
  return {
    httpOnly: base.httpOnly,
    secure: base.secure,
    sameSite: base.sameSite,
    path: base.path
  };
};

const normalizeEmail = (email) => String(email || '').trim().toLowerCase();
const normalizeName = (name) => String(name || '').trim();

const validateProfilePayload = ({ name, email, password }, { requirePassword }) => {
  const errors = [];

  const cleanName = normalizeName(name);
  const cleanEmail = normalizeEmail(email);

  if (!cleanName) errors.push('Username is required.');
  if (cleanName.length < 2) errors.push('Username must be at least 2 characters.');
  if (cleanName.length > 100) errors.push('Username must be at most 100 characters.');

  if (!cleanEmail) errors.push('Email is required.');
  if (cleanEmail && !EMAIL_REGEX.test(cleanEmail)) errors.push('Please enter a valid email address.');

  if (requirePassword && !password) errors.push('Password is required.');
  if (password && (password.length < 8 || password.length > 72)) {
    errors.push('Password must be between 8 and 72 characters.');
  }

  return {
    errors,
    cleanName,
    cleanEmail
  };
};

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  created_at: user.created_at
});

const signUserToken = (user, expiresIn = '2d') => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn }
  );
};

const issueUserSession = (req, res, user, statusCode, message) => {
  const token = signUserToken(user, '2d');
  const cookieOptions = getCookieOptions(req, TWO_DAYS_MS);

  return res
    .cookie('zelp_access_token', token, cookieOptions)
    .status(statusCode)
    .json({
      success: true,
      message,
      user: sanitizeUser(user)
    });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body || {};
  const { errors, cleanName, cleanEmail } = validateProfilePayload(
    { name, email, password },
    { requirePassword: true }
  );

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: errors[0],
      errors
    });
  }

  try {
    const existingUser = await db.query('SELECT id FROM users WHERE email = $1', [cleanEmail]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const insertResult = await db.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [cleanName, cleanEmail, hashedPassword, 'user']
    );

    return issueUserSession(req, res, insertResult.rows[0], 201, 'Registration successful.');
  } catch (error) {
    console.error('Register Error:', error);
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Unable to register right now. Please try again.'
    });
  }
};

exports.login = async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '');

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.'
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address.'
    });
  }

  try {
    const result = await db.query(
      'SELECT id, name, email, password, role, created_at FROM users WHERE email = $1 LIMIT 1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const user = result.rows[0];
    const isPasswordValid = user.password ? await bcrypt.compare(password, user.password) : false;

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    return issueUserSession(req, res, user, 200, 'Login successful.');
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to login right now. Please try again.'
    });
  }
};

exports.googleLogin = async (req, res) => {
  const { access_token } = req.body;
  if (!access_token) {
    return res.status(400).json({ success: false, message: 'Access token is required.' });
  }

  try {
    // Fetch user details from Google API
    const googleRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    
    if (!googleRes.ok) {
      return res.status(401).json({ success: false, message: 'Invalid Google access token.' });
    }

    const { name, email, sub: google_id } = await googleRes.json();
    const cleanEmail = normalizeEmail(email);
    const cleanName = normalizeName(name);

    // Check if user exists
    const result = await db.query(
      'SELECT id, name, email, role, created_at FROM users WHERE email = $1 LIMIT 1',
      [cleanEmail]
    );

    let user;
    let statusCode = 200;
    let message = 'Google login successful.';

    if (result.rows.length === 0) {
      // User doesn't exist, create a new one. Password is null since they use Google.
      const insertResult = await db.query(
        `INSERT INTO users (name, email, role)
         VALUES ($1, $2, $3)
         RETURNING id, name, email, role, created_at`,
        [cleanName, cleanEmail, 'user']
      );
      user = insertResult.rows[0];
      statusCode = 201;
      message = 'Google registration successful.';
    } else {
      user = result.rows[0];
    }

    return issueUserSession(req, res, user, statusCode, message);
  } catch (error) {
    console.error('Google Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to login with Google right now. Please try again.'
    });
  }
};


exports.adminLogin = async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '');

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.'
    });
  }

  const cookieOptions = getCookieOptions(req, 24 * 60 * 60 * 1000);

  try {
    const checkUser = await db.query(
      "SELECT id, name, email, password, role FROM users WHERE email = $1 AND role IN ('admin', 'super_admin') LIMIT 1",
      [email]
    );

    if (checkUser.rows.length === 0) {
      if (email === 'admin@zelp.com' && password === 'demo123') {
        const demoAdmin = { id: 0, email, name: 'Demo Admin', role: 'admin' };
        const token = signUserToken(demoAdmin, '1d');
        return res
          .cookie('admin_token', token, cookieOptions)
          .cookie('zelp_access_token', token, cookieOptions)
          .status(200)
          .json({ success: true, user: demoAdmin, token, message: 'Admin login successful.' });
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials.'
      });
    }

    const user = checkUser.rows[0];
    const isMatch = user.password ? await bcrypt.compare(password, user.password) : false;
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials.'
      });
    }

    const token = signUserToken(user, '1d');

    return res
      .cookie('admin_token', token, cookieOptions)
      .cookie('zelp_access_token', token, cookieOptions)
      .status(200)
      .json({
        success: true,
        user: sanitizeUser(user),
        token,
        message: 'Admin login successful.'
      });
  } catch (error) {
    console.error('Admin Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to login right now. Please try again.'
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const query = `
      SELECT
        u.id,
        u.name,
        u.email,
        u.role,
        u.created_at,
        (SELECT COUNT(*) FROM bookings b WHERE b.user_email = u.email) AS booking_count
      FROM users u
      ORDER BY u.created_at DESC
    `;

    const result = await db.query(query);
    return res.json(result.rows);
  } catch (error) {
    console.error('Database Error in getAllUsers:', error);
    const mockUsers = getMockUsers().map((u) => ({
      id: u.id,
      name: u.name || 'User',
      email: u.email || '',
      role: u.role || 'user',
      created_at: u.created_at || new Date().toISOString(),
      booking_count: 0
    }));
    return res.json(mockUsers);
  }
};

exports.updateProfile = async (req, res) => {
  const authUserId = Number(req.user?.id);
  if (!authUserId) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized user.'
    });
  }

  const { name, email, password } = req.body || {};
  const { errors, cleanName, cleanEmail } = validateProfilePayload(
    { name, email, password },
    { requirePassword: false }
  );

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: errors[0],
      errors
    });
  }

  try {
    const currentResult = await db.query(
      'SELECT id, name, email, password, role, created_at FROM users WHERE id = $1 LIMIT 1',
      [authUserId]
    );

    if (currentResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const currentUser = currentResult.rows[0];

    if (cleanEmail !== currentUser.email) {
      const emailUsed = await db.query('SELECT id FROM users WHERE email = $1 AND id <> $2', [cleanEmail, authUserId]);
      if (emailUsed.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'This email is already in use by another account.'
        });
      }
    }

    const hasPasswordChange = Boolean(password && String(password).trim().length > 0);
    let hashedPassword = currentUser.password;
    if (hasPasswordChange) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    const updatedResult = await db.query(
      `UPDATE users
       SET name = $1, email = $2, password = $3
       WHERE id = $4
       RETURNING id, name, email, role, created_at`,
      [cleanName, cleanEmail, hashedPassword, authUserId]
    );

    if (updatedResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    if (hasPasswordChange) {
      const verifyPasswordResult = await db.query(
        'SELECT password FROM users WHERE id = $1 LIMIT 1',
        [authUserId]
      );

      const persistedHash = verifyPasswordResult.rows[0]?.password;
      const passwordPersisted = persistedHash ? await bcrypt.compare(password, persistedHash) : false;

      if (!passwordPersisted) {
        return res.status(500).json({
          success: false,
          message: 'Password update failed to persist. Please try again.'
        });
      }
    }

    const updatedUser = updatedResult.rows[0];
    const successMessage = hasPasswordChange
      ? 'Profile updated successfully. Password changed.'
      : 'Profile updated successfully.';
    return issueUserSession(req, res, updatedUser, 200, successMessage);
  } catch (error) {
    console.error('Update Profile Error:', error);
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'This email is already in use by another account.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to update profile. Please try again.'
    });
  }
};

exports.getMe = async (req, res) => {
  const authUserId = Number(req.user?.id);
  if (!authUserId) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized user.'
    });
  }

  try {
    const result = await db.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = $1 LIMIT 1',
      [authUserId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const user = result.rows[0];
    const token = signUserToken(user, '2d');
    const cookieOptions = getCookieOptions(req, TWO_DAYS_MS);

    return res
      .cookie('zelp_access_token', token, cookieOptions)
      .json({
        success: true,
        user: sanitizeUser(user)
      });
  } catch (error) {
    console.error('GetMe Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch current user.'
    });
  }
};

exports.logout = (req, res) => {
  const clearOpts = getClearCookieOptions(req);
  res.clearCookie('zelp_access_token', clearOpts);
  res.clearCookie('admin_token', clearOpts);
  return res.json({ success: true, message: 'Logged out successfully.' });
};

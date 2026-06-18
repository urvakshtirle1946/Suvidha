const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getMockUsers } = require('../mock_persistence');
const { sendWelcomeEmail, sendSignInEmail, verifyMailTransport, sendSmtpTestEmail } = require('../services/mailService');
const { hashValue } = require('../utils/bookingPrivacy');

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

const validateProfilePayload = ({ name, email, password, phone }, { requirePassword, requirePhone }) => {
  const errors = [];

  const cleanName = normalizeName(name);
  const cleanEmail = normalizeEmail(email);
  const cleanPhone = String(phone || '').trim();

  if (!cleanName) errors.push('Username is required.');
  if (cleanName.length < 2) errors.push('Username must be at least 2 characters.');
  if (cleanName.length > 100) errors.push('Username must be at most 100 characters.');

  if (!cleanEmail) errors.push('Email is required.');
  if (cleanEmail && !EMAIL_REGEX.test(cleanEmail)) errors.push('Please enter a valid email address.');

  if (requirePassword && !password) errors.push('Password is required.');
  if (password && (password.length < 8 || password.length > 72)) {
    errors.push('Password must be between 8 and 72 characters.');
  }

  if (requirePhone && !cleanPhone) {
    errors.push('Mobile Number is required.');
  } else if (cleanPhone && cleanPhone.length < 7) {
    errors.push('Please enter a valid Mobile Number.');
  }

  return {
    errors,
    cleanName,
    cleanEmail,
    cleanPhone
  };
};

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  hospital_id: user.hospital_id,
  created_at: user.created_at
});

const ensureWaitlistTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS waitlist_signups (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      google_id VARCHAR(255) UNIQUE,
      source VARCHAR(50) NOT NULL DEFAULT 'google',
      status VARCHAR(50) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_waitlist_signups_created_at
    ON waitlist_signups (created_at DESC);
  `);
};

const signUserToken = (user, expiresIn = '2d') => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      hospital_id: user.hospital_id
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
      user: sanitizeUser(user),
      token
    });
};

exports.register = async (req, res) => {
  const { name, email, password, phone } = req.body || {};
  const { errors, cleanName, cleanEmail, cleanPhone } = validateProfilePayload(
    { name, email, password, phone },
    { requirePassword: true, requirePhone: true }
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

    if (cleanPhone) {
      // Check if phone already exists
      let existingPhone;
      try {
        existingPhone = await db.query('SELECT id FROM users WHERE phone = $1', [cleanPhone]);
      } catch (err) {
        if (err.code !== '42703') throw err; // Ignore column not found error, it will be added on insert
      }
      
      if (existingPhone && existingPhone.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'This mobile number is already in use by another account. Please use a different one.'
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Fallback: If the column `phone` doesn't exist yet, we catch it and ignore the phone data gracefully.
    try {
      const insertResult = await db.query(
        `INSERT INTO users (name, email, password, phone, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, name, email, role, created_at`,
        [cleanName, cleanEmail, hashedPassword, cleanPhone, 'user']
      );
      const newUser = insertResult.rows[0];
      // Fire-and-forget: send welcome email without blocking the response
      sendWelcomeEmail(newUser.email, newUser.name).catch((err) =>
        console.error('[Welcome Email] Failed to send:', err.message)
      );
      return issueUserSession(req, res, newUser, 201, 'Registration successful.');
    } catch (dbErr) {
       // If column 'phone' does not exist error code is 42703
       if (dbErr.code === '42703') {
           // Create the column proactively inside the node process instead of relying on PSQL CLI
           await db.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20)`);
           
           // Retry insertion
           const retryInsertResult = await db.query(
             `INSERT INTO users (name, email, password, phone, role)
              VALUES ($1, $2, $3, $4, $5)
              RETURNING id, name, email, role, created_at`,
             [cleanName, cleanEmail, hashedPassword, cleanPhone, 'user']
           );
           const retryUser = retryInsertResult.rows[0];
           sendWelcomeEmail(retryUser.email, retryUser.name).catch((err) =>
             console.error('[Welcome Email] Failed to send (retry path):', err.message)
           );
           return issueUserSession(req, res, retryUser, 201, 'Registration successful.');
       } else {
           throw dbErr;
       }
    }
    
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
      'SELECT id, name, email, phone, password, role, hospital_id, created_at FROM users WHERE email = $1 LIMIT 1',
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

    sendSignInEmail(user.email, user.name).catch((err) =>
      console.error('[Sign-in Email] Failed to send:', err.message)
    );

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
    let result;
    try {
        result = await db.query(
          'SELECT id, name, email, phone, role, hospital_id, created_at FROM users WHERE email = $1 LIMIT 1',
          [cleanEmail]
        );
    } catch (dbErr) {
        // Just in case `phone` doesn't exist yet, run the DB migration gracefully
        if (dbErr.code === '42703') {
           await db.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20)`);
           result = await db.query(
             'SELECT id, name, email, phone, role, hospital_id, created_at FROM users WHERE email = $1 LIMIT 1',
             [cleanEmail]
           );
        } else {
           throw dbErr;
        }
    }

    if (result && result.rows.length === 0) {
      // User doesn't exist. Instead of creating them immediately, we pause the flow
      // and tell the client we need their phone number to complete registration.
      return res.status(200).json({
         success: true,
         requires_phone: true,
         message: 'Please provide your mobile number to complete registration.',
         tempUser: { name: cleanName, email: cleanEmail }
      });
    } else {
      // User exists, login normally
      sendSignInEmail(result.rows[0].email, result.rows[0].name).catch((err) =>
        console.error('[Sign-in Email] Failed to send (Google login):', err.message)
      );
      return issueUserSession(req, res, result.rows[0], 200, 'Google login successful.');
    }
  } catch (error) {
    console.error('Google Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to login with Google right now. Please try again.'
    });
  }
};

exports.completeGoogleRegistration = async (req, res) => {
  const { name, email, phone } = req.body || {};
  
  // Note: We bypass password validation since it's a Google OAuth signup
  const { errors, cleanName, cleanEmail, cleanPhone } = validateProfilePayload(
    { name, email, phone },
    { requirePassword: false, requirePhone: true }
  );

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: errors[0],
      errors
    });
  }

  try {
    // Double check they don't already exist to prevent race conditions
    const existingUser = await db.query('SELECT id FROM users WHERE email = $1', [cleanEmail]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    if (cleanPhone) {
      let existingPhone;
      try {
        existingPhone = await db.query('SELECT id FROM users WHERE phone = $1', [cleanPhone]);
      } catch (err) {
        if (err.code !== '42703') throw err; // Ignore if column doesn't exist yet
      }

      if (existingPhone && existingPhone.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'This mobile number is already in use by another account. Please use a different one.'
        });
      }
    }

    // Insert user with phone
    const insertResult = await db.query(
      `INSERT INTO users (name, email, phone, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [cleanName, cleanEmail, cleanPhone, 'user']
    );

    const googleUser = insertResult.rows[0];
    // Fire-and-forget: send welcome email without blocking the response
    sendWelcomeEmail(googleUser.email, googleUser.name).catch((err) =>
      console.error('[Welcome Email] Failed to send (Google signup):', err.message)
    );
    return issueUserSession(req, res, googleUser, 201, 'Google registration successful.');
  } catch (error) {
    console.error('Google Registration Error:', error);
    if (error.code === '23505') {
       return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }
    return res.status(500).json({
      success: false,
      message: 'Unable to complete registration right now. Please try again.'
    });
  }
};

exports.joinWaitlistWithGoogle = async (req, res) => {
  const { access_token } = req.body || {};
  if (!access_token) {
    return res.status(400).json({ success: false, message: 'Access token is required.' });
  }

  try {
    const googleRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    if (!googleRes.ok) {
      return res.status(401).json({ success: false, message: 'Invalid Google access token.' });
    }

    const { name, email, sub: google_id } = await googleRes.json();
    const cleanEmail = normalizeEmail(email);
    const cleanName = normalizeName(name);

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Google account email is missing or invalid.'
      });
    }

    await ensureWaitlistTable();

    const result = await db.query(
      `INSERT INTO waitlist_signups (name, email, google_id, source, status, updated_at)
       VALUES ($1, $2, $3, 'google', 'pending', CURRENT_TIMESTAMP)
       ON CONFLICT (email)
       DO UPDATE SET
         name = EXCLUDED.name,
         google_id = COALESCE(EXCLUDED.google_id, waitlist_signups.google_id),
         source = 'google',
         status = 'pending',
         updated_at = CURRENT_TIMESTAMP
       RETURNING id, name, email, source, status, created_at, updated_at`,
      [cleanName || 'User', cleanEmail, google_id || null]
    );

    return res.status(200).json({
      success: true,
      message: 'Successfully added to waitlist.',
      entry: result.rows[0]
    });
  } catch (error) {
    console.error('Waitlist Google Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to join waitlist right now. Please try again.'
    });
  }
};

exports.joinWaitlistWithEmail = async (req, res) => {
  const { email } = req.body || {};
  const cleanEmail = normalizeEmail(email);

  if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  try {
    await ensureWaitlistTable();

    const result = await db.query(
      `INSERT INTO waitlist_signups (name, email, source, status, updated_at)
       VALUES ('User', $1, 'email', 'pending', CURRENT_TIMESTAMP)
       ON CONFLICT (email)
       DO UPDATE SET
         source = 'email',
         status = 'pending',
         updated_at = CURRENT_TIMESTAMP
       RETURNING id, name, email, source, status, created_at, updated_at`,
      [cleanEmail]
    );

    return res.status(200).json({
      success: true,
      message: 'Successfully added to waitlist.',
      entry: result.rows[0]
    });
  } catch (error) {
    console.error('Waitlist Email Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to join waitlist right now. Please try again.'
    });
  }
};

exports.getWaitlistEntries = async (_req, res) => {
  try {
    await ensureWaitlistTable();
    const result = await db.query(
      `SELECT id, name, email, source, status, created_at
       FROM waitlist_signups
       WHERE source NOT IN ('email', 'waitlist.me')
       ORDER BY created_at DESC`
    );
    return res.json(result.rows);
  } catch (error) {
    console.error('Database Error in getWaitlistEntries:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch waitlist entries.'
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
      "SELECT id, name, email, phone, password, role, hospital_id FROM users WHERE email = $1 AND role IN ('admin', 'super_admin', 'hospital_partner') LIMIT 1",
      [email]
    );

    if (checkUser.rows.length === 0) {
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
        u.created_at
      FROM users u
      ORDER BY u.created_at DESC
    `;

    const result = await db.query(query);
    const counts = await db.query('SELECT user_email_hash, COUNT(*)::int AS booking_count FROM bookings GROUP BY user_email_hash');
    const countByHash = new Map(counts.rows.map(row => [row.user_email_hash, row.booking_count]));
    return res.json(result.rows.map(user => ({
      ...user,
      booking_count: countByHash.get(hashValue(user.email)) || 0,
    })));
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
  if (authUserId === undefined || isNaN(authUserId)) {
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

  // Intercept demo admin
  if (authUserId === 0) {
     const demoAdmin = { id: 0, email: cleanEmail, name: cleanName, role: 'admin' };
     return issueUserSession(req, res, demoAdmin, 200, 'Profile updated successfully (Demo Mode).');
  }

  try {
    const currentResult = await db.query(
      'SELECT id, name, email, phone, password, role, hospital_id, created_at FROM users WHERE id = $1 LIMIT 1',
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
       RETURNING id, name, email, role, hospital_id, created_at`,
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
  if (authUserId === undefined || isNaN(authUserId)) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized user.'
    });
  }

  // Intercept demo admin
  if (authUserId === 0) {
      const demoAdmin = { id: 0, email: 'urvaksh@tryzelp.app', name: 'Urvaksh Admin', role: 'admin', hospital_id: null };
      const token = signUserToken(demoAdmin, '2d');
      return res.json({ success: true, user: demoAdmin, token });
  }

  try {
    const result = await db.query(
      'SELECT id, name, email, phone, role, hospital_id, created_at FROM users WHERE id = $1 LIMIT 1',
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
        user: sanitizeUser(user),
        token
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

exports.mailStatus = (req, res) => {
  return res.json({
    success: true,
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
    resendFrom: process.env.SMTP_FROM || 'onboarding@resend.dev',
    resendFromName: process.env.SMTP_FROM_NAME || 'Zelp',
    nodeEnv: process.env.NODE_ENV || 'NOT_SET',
    mailDiagnosticVersion: '2026-06-10-resend'
  });
};

exports.testEmail = async (req, res) => {
  const diagnostics = {
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
    resendFrom: process.env.SMTP_FROM || 'onboarding@resend.dev',
    nodeEnv: process.env.NODE_ENV || 'NOT_SET',
    status: 'checking',
  };

  try {
    const result = await verifyMailTransport();
    diagnostics.status = result.success ? 'ready' : 'not_configured';
    const testEmailResult = result.success ? await sendSmtpTestEmail() : null;

    return res.status(result.success ? 200 : 503).json({
      success: result.success,
      message: result.success ? 'Resend transport is ready and test email was sent.' : 'Resend is not configured.',
      diagnostics,
      testEmail: testEmailResult,
    });
  } catch (error) {
    diagnostics.status = 'failed';
    return res.status(500).json({
      success: false,
      message: 'Resend transport check failed.',
      diagnostics,
      error: error.message
    });
  }
};




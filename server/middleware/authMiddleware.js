const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'zelp_secret_key_2024';

const verifyJWT = async (req, res, next) => {
  let token = null;

  if (req.cookies?.zelp_access_token) {
    token = req.cookies.zelp_access_token;
  }

  if (!token) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.id === 0) {
      req.user = decoded;
      return next();
    }
    const result = await db.query(
      'SELECT id, name, email, phone, role, hospital_id FROM users WHERE id = $1 LIMIT 1',
      [decoded.id]
    );
    if (result.rows.length === 0) {
      return res.status(403).json({ success: false, message: 'Forbidden: Account no longer exists.' });
    }
    req.user = result.rows[0];
    return next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Forbidden: Invalid or expired token.' });
  }
};

const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user?.role) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User role not found.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions.' });
    }

    return next();
  };
};

module.exports = {
  verifyJWT,
  requireRole
};

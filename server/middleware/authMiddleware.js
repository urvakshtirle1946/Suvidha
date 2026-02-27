const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

// Middleware to verify JWT token
const verifyJWT = async (req, res, next) => {
  // Get token from Authorization header or cookies if implemented later
  const authHeader = req.headers.authorization || req.headers.Authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'zelp_secret_key_2024');
    req.user = decoded; // Attach user payload to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

// Middleware for Role-Based Access Control
const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Unauthorized: User role not found' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};

// Middleware to enforce Phone Verification Application Rule
const requireVerifiedPhone = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
  }

  // Check roles - Admins bypass this phone rule if necessary, or enforce globally. Enforcing globally based on user prompt.
  const userSub = req.user.sub || req.user.id || null;
  const userEmail = req.user.email || null;
  const userPhone = req.user.phone_number || req.user.phone || null;

  try {
    const checkUser = await db.query(
      'SELECT phone_verified FROM users WHERE authgear_id = $1 OR email = $2 OR phone = $3', 
      [userSub, userEmail, userPhone]
    );

    if (checkUser.rows.length === 0) {
       return res.status(403).json({ success: false, message: 'Forbidden: User identity not found in database.' });
    }

    if (checkUser.rows[0].phone_verified !== true) {
       return res.status(403).json({ 
           success: false, 
           message: 'Forbidden: Phone verification is strictly required to access this resource.',
           requires_verification: true 
       });
    }

    next();
  } catch (error) {
    console.error("RequireVerifiedPhone Middleware Error:", error);
    return res.status(500).json({ success: false, message: 'Internal Server Error during verification check' });
  }
};

module.exports = {
  verifyJWT,
  requireRole,
  requireVerifiedPhone
};


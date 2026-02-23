const jwt = require('jsonwebtoken');
const { createRemoteJWKSet, jwtVerify } = require('jose');
require('dotenv').config();

const JWKS = process.env.NEXT_PUBLIC_AUTHGEAR_ENDPOINT 
  ? createRemoteJWKSet(new URL(`${process.env.NEXT_PUBLIC_AUTHGEAR_ENDPOINT}/oauth2/jwks`))
  : null;

// Middleware to verify JWT token
const verifyJWT = async (req, res, next) => {
  // Get token from Authorization header or cookies if implemented later
  const authHeader = req.headers.authorization || req.headers.Authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    if (JWKS) {
      // Try verifying with Authgear first
      const { payload } = await jwtVerify(token, JWKS, {
        issuer: process.env.NEXT_PUBLIC_AUTHGEAR_ENDPOINT,
      });
      req.user = payload;
      return next();
    }
  } catch (err) {
    // If Authgear verification fails, fallback to legacy custom JWT verification for admins/testing
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_key_here');
      req.user = decoded;
      return next();
    } catch (legacyErr) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
  }

  // If no JWKS and no exception thrown above, try legacy verification
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_key_here');
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

module.exports = {
  verifyJWT,
  requireRole
};


const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const rateLimit = require('express-rate-limit');
const { verifyJWT, requireRole } = require('../middleware/authMiddleware');

// Rate Limiter: Max 5 OTPs per 10 minutes
const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5, 
  message: { success: false, message: 'Too many OTP requests. Please try again later.' },
  standardHeaders: true, 
  legacyHeaders: false,
});

// Rate Limiter: Max 5 Admin Logins per 15 minutes
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: { success: false, message: 'Too many login attempts from this IP, please try again later.' },
  standardHeaders: true, 
  legacyHeaders: false,
});

// router.post('/send-otp', otpLimiter, authController.sendOtp); // Removed
// router.post('/verify-otp', authController.verifyOtp); // Removed

router.post('/admin-login', adminLoginLimiter, authController.adminLogin);
router.post('/sync', verifyJWT, authController.authgearSync);
router.post('/request-verification-otp', verifyJWT, authController.requestVerificationOtp);
router.post('/verify-phone', verifyJWT, authController.verifyPhone);


// Token Endpoints
router.post('/token', authController.phoneLogin); // Alias for token generation
router.get('/verify-token', (req, res) => {
    // Simple verification middleware/handler (stub)
    // In real app, verify header Authorization: Bearer <token>
    res.json({ message: 'Token verification endpoint ready.' });
});

// router.post('/phone-login', authController.phoneLogin); // Removed
// router.post('/google-login', authController.googleLogin); // Removed
// router.get('/msg91-config', authController.getMsg91Config); // Removed
// router.post('/msg91-login', authController.msg91Login); // Removed
router.put('/profile', verifyJWT, authController.updateProfile);
router.get('/users', verifyJWT, requireRole(['admin', 'super_admin']), authController.getAllUsers);

module.exports = router;

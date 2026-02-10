const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const rateLimit = require('express-rate-limit');

// Rate Limiter: Max 5 OTPs per 10 minutes
const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5, 
  message: { success: false, message: 'Too many OTP requests. Please try again later.' },
  standardHeaders: true, 
  legacyHeaders: false,
});

router.post('/send-otp', otpLimiter, authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);


// Token Endpoints
router.post('/token', authController.phoneLogin); // Alias for token generation
router.get('/verify-token', (req, res) => {
    // Simple verification middleware/handler (stub)
    // In real app, verify header Authorization: Bearer <token>
    res.json({ message: 'Token verification endpoint ready.' });
});

router.post('/phone-login', authController.phoneLogin);
router.post('/google-login', authController.googleLogin);
router.get('/users', authController.getAllUsers);

module.exports = router;

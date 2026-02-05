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


router.post('/phone-login', authController.phoneLogin);
router.get('/users', authController.getAllUsers);

module.exports = router;

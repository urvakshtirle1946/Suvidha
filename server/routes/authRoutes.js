const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const rateLimit = require('express-rate-limit');
const { verifyJWT, requireRole } = require('../middleware/authMiddleware');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many authentication requests. Please try again later.' },
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

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.get('/mail-status', authController.mailStatus);
router.get('/test-email', authController.testEmail);
router.post('/google', authLimiter, authController.googleLogin);
router.post('/complete-google', authLimiter, authController.completeGoogleRegistration);
router.post('/waitlist/google', authLimiter, authController.joinWaitlistWithGoogle);
router.post('/waitlist/email', authLimiter, authController.joinWaitlistWithEmail);
router.post('/admin-login', adminLoginLimiter, authController.adminLogin);
router.put('/profile', verifyJWT, authController.updateProfile);
router.get('/users', verifyJWT, requireRole(['admin', 'super_admin']), authController.getAllUsers);
router.get('/waitlist', verifyJWT, requireRole(['admin', 'super_admin']), authController.getWaitlistEntries);
router.get('/me', verifyJWT, authController.getMe);
router.post('/logout', authController.logout);

module.exports = router;

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyJWT, requireRole } = require('../middleware/authMiddleware');
const { auditLog } = require('../middleware/auditMiddleware');

router.post('/', verifyJWT, bookingController.createBooking);
router.get('/', verifyJWT, bookingController.getBookings);
router.patch('/:id/status', verifyJWT, requireRole(['admin', 'super_admin']), auditLog(req => `UPDATE_BOOKING_STATUS_${req.params.id}`), bookingController.updateBookingStatus);
router.patch('/:id/pay', verifyJWT, auditLog(req => `UPDATE_BOOKING_PAYMENT_${req.params.id}`), bookingController.payBooking);

// Razorpay endpoints
router.post('/razorpay-order', verifyJWT, bookingController.createRazorpayOrder);
// We will add the verification endpoint next
router.post('/verify-payment', verifyJWT, bookingController.verifyRazorpayPayment);

module.exports = router;

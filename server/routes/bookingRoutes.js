const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyJWT, requireRole, requireVerifiedPhone } = require('../middleware/authMiddleware');
const { auditLog } = require('../middleware/auditMiddleware');

router.post('/', verifyJWT, requireVerifiedPhone, bookingController.createBooking);
router.get('/', verifyJWT, requireVerifiedPhone, bookingController.getBookings);
router.patch('/:id/status', verifyJWT, requireRole(['admin', 'super_admin']), auditLog(req => `UPDATE_BOOKING_STATUS_${req.params.id}`), bookingController.updateBookingStatus);
router.patch('/:id/pay', verifyJWT, requireRole(['admin', 'super_admin']), auditLog(req => `UPDATE_BOOKING_PAYMENT_${req.params.id}`), bookingController.payBooking);

module.exports = router;

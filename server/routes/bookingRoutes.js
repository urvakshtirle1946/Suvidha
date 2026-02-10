const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.patch('/:id/status', bookingController.updateBookingStatus);
router.patch('/:id/pay', bookingController.payBooking);

module.exports = router;

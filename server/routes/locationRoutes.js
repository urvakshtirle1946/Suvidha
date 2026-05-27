const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.get('/reverse', locationController.reverseGeocode);

module.exports = router;

const express = require('express');
const router = express.Router();
const ambulanceController = require('../controllers/ambulanceController');

router.post('/request', ambulanceController.requestAmbulance);
router.get('/requests', ambulanceController.getRequests);

module.exports = router;

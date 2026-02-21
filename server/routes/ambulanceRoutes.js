const express = require('express');
const router = express.Router();
const ambulanceController = require('../controllers/ambulanceController');
const { verifyJWT, requireRole } = require('../middleware/authMiddleware');
const { auditLog } = require('../middleware/auditMiddleware');

router.post('/request', ambulanceController.requestAmbulance);
router.get('/requests', verifyJWT, requireRole(['admin', 'super_admin']), auditLog('FETCH_AMBULANCE_REQUESTS'), ambulanceController.getRequests);

module.exports = router;

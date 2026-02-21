const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { verifyJWT, requireRole } = require('../middleware/authMiddleware');
const { auditLog } = require('../middleware/auditMiddleware');

router.get('/', serviceController.getAllServices);
router.post('/', verifyJWT, requireRole(['admin', 'super_admin']), auditLog('CREATE_SERVICE'), serviceController.createService);

module.exports = router;

const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { verifyJWT, requireRole } = require('../middleware/authMiddleware');
const { auditLog } = require('../middleware/auditMiddleware');

router.get('/', serviceController.getAllServices);
router.get('/manage', verifyJWT, requireRole(['admin', 'super_admin', 'hospital_partner']), serviceController.getManagedServices);
router.post('/', verifyJWT, requireRole(['admin', 'super_admin', 'hospital_partner']), auditLog('CREATE_SERVICE'), serviceController.createService);
router.put('/:id', verifyJWT, requireRole(['admin', 'super_admin', 'hospital_partner']), auditLog(req => `UPDATE_SERVICE_${req.params.id}`), serviceController.updateService);
router.patch('/:id', verifyJWT, requireRole(['admin', 'super_admin', 'hospital_partner']), auditLog(req => `UPDATE_SERVICE_${req.params.id}`), serviceController.updateService);

module.exports = router;

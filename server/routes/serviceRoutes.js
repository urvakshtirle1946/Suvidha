const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { verifyJWT, requireRole } = require('../middleware/authMiddleware');
const { auditLog } = require('../middleware/auditMiddleware');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.get('/', serviceController.getAllServices);
router.get('/manage', verifyJWT, requireRole(['admin', 'super_admin', 'hospital_partner']), serviceController.getManagedServices);
router.post('/', verifyJWT, requireRole(['admin', 'super_admin', 'hospital_partner']), auditLog('CREATE_SERVICE'), serviceController.createService);
router.put('/:id', verifyJWT, requireRole(['admin', 'super_admin', 'hospital_partner']), auditLog(req => `UPDATE_SERVICE_${req.params.id}`), serviceController.updateService);
router.patch('/:id', verifyJWT, requireRole(['admin', 'super_admin', 'hospital_partner']), auditLog(req => `UPDATE_SERVICE_${req.params.id}`), serviceController.updateService);
router.delete('/:id', verifyJWT, requireRole(['admin', 'super_admin', 'hospital_partner']), auditLog(req => `DELETE_SERVICE_${req.params.id}`), serviceController.deleteService);

router.post('/upload-import', verifyJWT, requireRole(['admin', 'super_admin', 'hospital_partner']), upload.single('file'), auditLog('IMPORT_SERVICES_DOCUMENT'), serviceController.importServicesFromDocument);

router.post('/upload-import', verifyJWT, requireRole(['admin', 'super_admin', 'hospital_partner']), upload.single('file'), auditLog('IMPORT_SERVICES_DOCUMENT'), serviceController.importServicesFromDocument);

module.exports = router;

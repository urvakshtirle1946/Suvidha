const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const { verifyJWT, requireRole } = require('../middleware/authMiddleware');
const { auditLog } = require('../middleware/auditMiddleware');

const multer = require('multer');
const path = require('path');

// Multer Config - Memory Storage for DB Blobs/Base64
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.get('/', hospitalController.getAllHospitals);
router.get('/manage', verifyJWT, requireRole(['admin', 'super_admin', 'hospital_partner']), hospitalController.getManagedHospitals);
router.get('/:id', hospitalController.getHospitalById);
router.post('/', verifyJWT, requireRole(['admin', 'super_admin']), auditLog('CREATE_HOSPITAL'), upload.single('image'), hospitalController.createHospital);
router.put('/:id', verifyJWT, requireRole(['admin', 'super_admin', 'hospital_partner']), auditLog(req => `UPDATE_HOSPITAL_${req.params.id}`), upload.single('image'), hospitalController.updateHospital);
router.delete('/:id', verifyJWT, requireRole(['admin', 'super_admin']), auditLog(req => `DELETE_HOSPITAL_${req.params.id}`), hospitalController.deleteHospital);

module.exports = router;

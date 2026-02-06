const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

const multer = require('multer');
const path = require('path');

// Multer Config - Memory Storage for DB Blobs/Base64
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.get('/', hospitalController.getAllHospitals);
router.get('/:id', hospitalController.getHospitalById);
router.post('/', upload.single('image'), hospitalController.createHospital);
router.put('/:id', upload.single('image'), hospitalController.updateHospital);
router.delete('/:id', hospitalController.deleteHospital);

module.exports = router;

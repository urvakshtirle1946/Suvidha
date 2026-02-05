const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

const multer = require('multer');
const path = require('path');

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage: storage });

router.get('/', hospitalController.getAllHospitals);
router.post('/', upload.single('image'), hospitalController.createHospital);
router.put('/:id', upload.single('image'), hospitalController.updateHospital);
router.delete('/:id', hospitalController.deleteHospital);

module.exports = router;

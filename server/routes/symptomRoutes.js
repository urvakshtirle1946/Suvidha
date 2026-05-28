const express = require('express');
const router = express.Router();
const symptomController = require('../controllers/symptomController');

router.post('/suggest', symptomController.suggestTests);

module.exports = router;

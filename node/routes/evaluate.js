const express = require('express');
const router = express.Router();

const EvaluateController = require('../controllers/evaluate');

router.post('/send', EvaluateController.addValuate);
router.get('/', EvaluateController.getValuate);

module.exports = router;

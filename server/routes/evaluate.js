const express = require('express');
const router = express.Router();

const EvaluateController = require('../controllers/evaluate');
const isAuth = require('../middleware/isAuth');

router.post('/send', isAuth.client, EvaluateController.addValuate);
router.get('/', EvaluateController.getValuate);

module.exports = router;

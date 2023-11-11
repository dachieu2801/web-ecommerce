const express = require('express');
const router = express.Router();

const HistoryController = require('../controllers/history');

router.get('/all', HistoryController.all);
router.get('/:id', HistoryController.detailOrder);
router.get('/', HistoryController.index);

module.exports = router;

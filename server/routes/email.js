const express = require('express');
const router = express.Router();

const EmailController = require('../controllers/email');
const isAuth = require('../middleware/isAuth');

router.post('/', isAuth.client, EmailController.send);

module.exports = router;

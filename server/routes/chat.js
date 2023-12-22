const express = require('express');
const router = express.Router();

const Chat = require('../controllers/chat');

router.get('/getAllRoom', Chat.index);
router.post('/createNewRoom', Chat.createRoom);
router.get('/getById/', Chat.getRoom);

module.exports = router;

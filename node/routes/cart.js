const express = require('express');
const router = express.Router();

const CartController = require('../controllers/cart');


router.delete('/delete', CartController.removeInCart);
router.put('/update', CartController.updateCart);
router.post('/add', CartController.addCart);
router.get('/', CartController.getcart);

module.exports = router;

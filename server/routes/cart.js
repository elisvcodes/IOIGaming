const express = require('express');
const router = express.Router();
const { addToCart, getCartItems } = require('../controllers/cart');

router.post('/', addToCart);
router.post('/items', getCartItems);
module.exports = router;

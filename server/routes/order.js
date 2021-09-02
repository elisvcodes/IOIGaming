const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrder } = require('../controllers/order');
const { protected } = require('../middleware/auth');

router.post('/create', createOrder);
router.get('/', protected, getOrders);
router.patch('/update', protected, updateOrder);
module.exports = router;

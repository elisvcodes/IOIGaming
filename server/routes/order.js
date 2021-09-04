const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  updateOrder,
  weeklyOrdersGraph,
} = require('../controllers/order');
const { protected } = require('../middleware/auth');

router.post('/create', createOrder);
router.get('/', protected, getOrders);
router.get('/weeklygraph', protected, weeklyOrdersGraph);
router.patch('/update', protected, updateOrder);
module.exports = router;

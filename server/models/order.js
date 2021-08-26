const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerFirstName: String,
  customerLastName: String,
  customerAddress: String,
  customerApt: String,
  customerZip: String,
  customerCity: String,
  customerState: String,
  customerEmail: String,
  customerPhone: Number,
  itemsOrdered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  orderTotal: Number,
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

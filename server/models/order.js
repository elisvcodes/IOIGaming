const mongoose = require('mongoose');

const orderNumber = () => {
  let now = Date.now().toString();
  now += now + Math.floor(Math.random() * 10);
  return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-');
};

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, default: () => orderNumber() },
    firstName: String,
    lastName: String,
    address: String,
    apt: String,
    zip: String,
    city: String,
    state: String,
    email: String,
    phone: Number,
    itemsOrdered: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: { type: Number, default: 0 },
      },
    ],
    orderTotal: Number,
    hasShipped: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

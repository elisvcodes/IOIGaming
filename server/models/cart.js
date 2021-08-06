const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      total: Number,
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
    shortDescription: { type: String },
    longDescription: { type: String, require: true },
    categoryId: [
      { id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } },
    ],
    price: { type: Number, require: true },
    sku: { type: String, require: true },
    quantity: { type: Number, require: true },
    isFeatured: { type: Number, default: 2 },

    productImg: [
      {
        img: String,
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

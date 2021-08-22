const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    parentId: { type: String },
    categoryImg: [
      {imageName: String, imageUrl: String, imageId: String}
    ],
    isFeatured: { type: Number, default: 2 },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

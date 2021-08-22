const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String },
    heroImage: [
      { imageName: String, imageUrl: String, imageId: String }
    ],
    heroImageLinkTo: { type: String },
  },
  { timestamps: true }
);

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;

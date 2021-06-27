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
    heroImage: { type: String, required: true },
    heroImageLinkTo: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;

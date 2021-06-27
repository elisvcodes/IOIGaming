const Page = require('../models/page');

exports.createPage = (req, res) => {
  const data = {
    owner: req.user._id,
    name: req.body.name,
    slug: req.body.slug
      ? slugify(req.body.slug, { replacement: '-', lower: true })
      : slugify(req.body.name, { replacement: '-', lower: true }),
    heroImage: req.file.filename,
    heroImageLinkTo: req.body.heroImageLinkTo,
    content: req.body.content,
  };
};

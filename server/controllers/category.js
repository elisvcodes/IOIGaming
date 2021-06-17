const Category = require('../models/category');
const slugify = require('slugify');

exports.createCategory = (req, res) => {
  const data = {
    owner: req.user._id,
    name: req.body.name,
    description: req.body.description,
    slug: req.body.slug
      ? slugify(req.body.slug, { replacement: '-', lower: true })
      : slugify(req.body.name, { replacement: '-', lower: true }),
  };

  if (req.body.parentId) {
    data.parentId = req.body.parentId;
  }

  if (req.file) {
    data.categoryImg = req.file.filename;
  }

  const category = new Category(data);

  category.save((err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    res.status(200).json(result);
  });
};

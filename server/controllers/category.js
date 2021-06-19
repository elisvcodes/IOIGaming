const Category = require('../models/category');
const slugify = require('slugify');

const displayCategory = (categories, parentId = null) => {
  let category;
  let categoriesList = [];

  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (const cat of category) {
    categoriesList.push({
      _id: cat._id,
      name: cat.name,
      description: cat.description,
      slug: cat.slug,
      categoryImg: cat.categoryImg,
      parentId: cat.parentId,
      children: displayCategory(categories, cat._id),
    });
  }
  return categoriesList;
};

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

exports.getCategories = (req, res) => {
  Category.find({}).exec((err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    const list = displayCategory(result);
    res.status(200).json(list);
  });
};

exports.deleteCategory = (req, res) => {
  Category.findOneAndDelete({ _id: req.params.id }).exec((err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    res.status(200).json({ msg: 'deleted successfully' });
  });
};

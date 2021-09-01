const Category = require('../models/category');
const Product = require('../models/product');
const mongoose = require('mongoose');
const cloud = require('../middleware/cloudinaryConfig');

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
      isFeatured: cat.isFeatured,
      children: displayCategory(categories, cat._id),
    });
  }
  return categoriesList;
};

exports.createCategory = async (req, res) => {
  const data = {
    owner: req.user._id,
    name: req.body.name,
    description: req.body.description,
    isFeatured: req.body.isFeatured,
    slug: req.body.slug
      ? slugify(req.body.slug, { replacement: '-', lower: true })
      : slugify(req.body.name, { replacement: '-', lower: true }),
  };

  if (req.body.parentId) {
    data.parentId = req.body.parentId;
  }

  if (req.file) {
    let attempt = {
      imageName: req.file.originalname,
      imageUrl: req.file.path,
      imageId: '',
    };

    const img = await cloud.uploads(attempt.imageUrl).then((result) => {
      let imageDetails = {
        imageName: req.file.originalname,
        imageUrl: result.url,
        imageId: result.id,
      };

      return imageDetails;
    });
    data.categoryImg = img;
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

exports.getProductsByCat = (req, res) => {
  Category.findOne({ slug: req.params.slug }).exec((err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    const match = {};
    if (req.query.pmax) {
      match.pmax = req.query.pmax === { $gte: 250 };
    }

    if (result !== null) {
      Product.find({
        'categoryId.id': mongoose.Types.ObjectId(result._id),
      })
        .populate({ path: req.params.slug, match })
        .exec((err, products) => {
          if (err) {
            return res.status(400).json({ msg: err });
          }
          res.status(200).json(products);
        });
    }
  });
};

exports.updateCategory = async (req, res) => {
  const data = {
    _id: req.body._id,
    name: req.body.name,
    description: req.body.description,
    isFeatured: req.body.isFeatured,
    slug: req.body.slug
      ? slugify(req.body.slug, { replacement: '-', lower: true })
      : slugify(req.body.name, { replacement: '-', lower: true }),
  };

  if (req.body.parentId !== req.body._id) {
    data.parentId = req.body.parentId;
  }

  if (req.file) {
    let attempt = {
      imageName: req.file.originalname,
      imageUrl: req.file.path,
      imageId: '',
    };

    const img = await cloud.uploads(attempt.imageUrl).then((result) => {
      let imageDetails = {
        imageName: req.file.originalname,
        imageUrl: result.url,
        imageId: result.id,
      };

      return imageDetails;
    });
    data.categoryImg = img;
  }

  Category.findOneAndUpdate({ _id: data._id }, data, {
    returnOriginal: false,
  }).exec((err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    res.status(200).json(result);
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

const Category = require('../models/category');
const Product = require('../models/product');
const slugify = require('slugify');

exports.createProduct = (req, res) => {
  const data = {
    owner: req.user._id,
    name: req.body.name,
    slug: req.body.slug
      ? slugify(req.body.slug, { replacement: '-', lower: true })
      : slugify(req.body.name, { replacement: '-', lower: true }),
    longDescription: req.body.longDescription,
    categoryId: req.body.categoryId,
    price: req.body.price,
    sku: req.body.sku,
    quantity: req.body.quantity,
  };

  if (req.body.shortDescription) {
    data.shortDescription = req.body.shortDescription;
  }

  if (req.files) {
    data.productImg = req.files.map((img) => {
      return {
        img: img.filename,
      };
    });
  }

  const product = new Product(data);
  product.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

exports.getProducts = (req, res) => {
  Product.find({}).exec((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

exports.updateProduct = (req, res) => {
  const data = {
    owner: req.user._id,
    id: req.body._id,
    name: req.body.name,
    slug: req.body.slug ? req.body.slug : req.body.name,
    longDescription: req.body.longDescription,
    categoryId: req.body.categoryId,
    price: req.body.price,
    sku: req.body.sku,
    quantity: req.body.quantity,
  };

  if (req.body.shortDescription) {
    data.shortDescription = req.body.shortDescription;
  }

  if (req.files.length > 0) {
    data.productImg = req.files.map((img) => {
      return {
        img: img.filename,
      };
    });

    Product.findOneAndUpdate({ _id: data.id }, data, {
      returnOriginal: false,
    }).exec((err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(result);
    });
  }
};

exports.deleteProduct = (req, res) => {
  Product.findOneAndDelete({ _id: req.params.id }).exec((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

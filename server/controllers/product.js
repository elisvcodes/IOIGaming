const Category = require('../models/category');
const Product = require('../models/product');

exports.createProduct = (req, res) => {
  const data = {
    owner: req.user._id,
    name: req.body.name,
    longDescription: req.body.longDescription,
    categoryId: req.body.categoryId,
    price: req.body.price,
    sku: req.body.sku,
    qunatity: req.body.quantity,
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

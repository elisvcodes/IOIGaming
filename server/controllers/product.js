const Product = require('../models/product');
const Category = require('../models/category');
const slugify = require('slugify');
const mongoose = require('mongoose');
const cloud = require('../middleware/cloudinaryConfig');

exports.createProduct = async (req, res) => {
  const data = {
    owner: req.user._id,
    name: req.body.name,
    slug: req.body.slug
      ? slugify(req.body.slug, { replacement: '-', lower: true })
      : slugify(req.body.name, { replacement: '-', lower: true }),
    longDescription: req.body.longDescription,
    categoryId: Array.isArray(req.body.categoryId)
      ? req.body.categoryId.map((id) => {
          return {
            id: mongoose.Types.ObjectId(id),
          };
        })
      : { id: mongoose.Types.ObjectId(req.body.categoryId) },
    price: req.body.price,
    sku: req.body.sku,
    quantity: req.body.quantity,
    isFeatured: req.body.isFeatured,
  };

  if (req.body.shortDescription) {
    data.shortDescription = req.body.shortDescription;
  }

  if (req.files.length > 0) {
    const fileUploads = async (from, to = []) => {
      for (const file of from) {
        let attempt = {
          imageName: file.originalname,
          imageUrl: file.path,
          imageId: '',
        };
        await cloud.uploads(attempt.imageUrl).then((result) => {
          let imageDetails = {
            imageName: file.originalname,
            imageUrl: result.url,
            imageId: result.id,
          };
          to.push(imageDetails);
        });
      }

      return to;
    };

    data.productImg = await fileUploads(req.files);
  }

  const product = new Product(data);
  product.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

exports.getProducts = async (req, res) => {
  const query = req.query.q || '';
  const keyword = query
    ? { longDescription: { $regex: query, $options: 'i' } }
    : {};

  const max =
    req.query.pmax && Number(req.query.pmax) !== 0 ? Number(req.query.pmax) : 0;
  const min =
    req.query.pmin && Number(req.query.pmin) !== 0 ? Number(req.query.pmin) : 0;

  const categorySlug = req.params.slug || '';
  const getCategory = await Category.findOne({ slug: categorySlug }).exec();
  const categoryId = categorySlug
    ? { 'categoryId.id': mongoose.Types.ObjectId(getCategory._id) }
    : {};

  const priceQueries = min && max ? { price: { $gte: min, $lte: max } } : {};

  Product.find({ ...keyword, ...categoryId, ...priceQueries }).exec(
    (err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(result);
    }
  );
};

exports.getSingleProduct = (req, res) => {
  Product.findOne({ slug: req.params.slug }).exec((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

exports.updateProduct = async (req, res) => {
  const data = {
    owner: req.user._id,
    id: req.body._id,
    name: req.body.name,
    slug: req.body.slug
      ? slugify(req.body.slug, { replacement: '-', lower: true })
      : slugify(req.body.name, { replacement: '-', lower: true }),
    longDescription: req.body.longDescription,
    categoryId: Array.isArray(req.body.categoryId)
      ? req.body.categoryId.map((id) => {
          return {
            id: mongoose.Types.ObjectId(id),
          };
        })
      : { id: mongoose.Types.ObjectId(req.body.categoryId) },

    price: req.body.price,
    sku: req.body.sku,
    quantity: req.body.quantity,
    isFeatured: req.body.isFeatured,
  };

  if (req.body.shortDescription) {
    data.shortDescription = req.body.shortDescription;
  }

  if (req.files.length > 0) {
    const fileUploads = async (from, to = []) => {
      for (const file of from) {
        let attempt = {
          imageName: file.originalname,
          imageUrl: file.path,
          imageId: '',
        };
        await cloud.uploads(attempt.imageUrl).then((result) => {
          let imageDetails = {
            imageName: file.originalname,
            imageUrl: result.url,
            imageId: result.id,
          };
          to.push(imageDetails);
        });
      }

      return to;
    };

    data.productImg = await fileUploads(req.files);
  }

  Product.findOneAndUpdate({ _id: data.id }, data, {
    returnOriginal: false,
  }).exec((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

exports.deleteProduct = (req, res) => {
  Product.findOneAndDelete({ _id: req.params.id }).exec((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

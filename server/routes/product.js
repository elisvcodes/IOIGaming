const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/product');
const { protected } = require('../middleware/auth');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/media/products'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

let upload = multer({ storage: storage });

router.post('/create', protected, upload.array('productImgs'), createProduct);
router.get('/', getProducts)
module.exports = router;

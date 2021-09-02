const express = require('express');
const multer = require('multer');

const path = require('path');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getProductsByCat,
  deleteCategory,
  updateCategory,
} = require('../controllers/category');
const { protected } = require('../middleware/auth');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/media/categories'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

let upload = multer({ storage: storage });

router.post('/create', protected, upload.single('categoryImg'), createCategory);
router.get('/', getCategories);
// router.get('/:slug', getProductsByCat);

router.patch(
  '/update',
  protected,
  upload.single('categoryImg'),
  updateCategory
);
router.delete('/:id', protected, deleteCategory);
module.exports = router;

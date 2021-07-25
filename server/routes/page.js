const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protected } = require('../middleware/auth');
const {
  createPage,
  getPages,
  updatePage,
  deletePage,
} = require('../controllers/page');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/media/pages'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

let upload = multer({ storage: storage });

router.post('/create', protected, upload.single('heroImage'), createPage);
router.get('/', getPages);
router.patch('/update', protected, upload.single('heroImage'), updatePage);
router.delete('/:id', protected, deletePage);
module.exports = router;

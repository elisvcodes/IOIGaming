const Page = require('../models/page');
const slugify = require('slugify');

exports.createPage = (req, res) => {
  const data = {
    owner: req.user._id,
    name: req.body.name,
    slug: req.body.slug
      ? slugify(req.body.slug, { replacement: '-', lower: true })
      : slugify(req.body.name, { replacement: '-', lower: true }),
    content: req.body.content,
  };

  if (req.body.heroImageLinkTo) {
    data.heroImageLinkTo = req.body.heroImageLinkTo;
  }

  if (req.file) {
    data.heroImage = req.file.filename;
  }

  const page = new Page(data);

  page.save((err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    res.status(200).json(result);
  });
};

exports.getPages = (req, res) => {
  Page.find({}).exec((err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    res.status(200).json(result);
  });
};

exports.updatePage = (req, res) => {
  const data = {
    _id: req.body._id,
    name: req.body.name,
    slug: req.body.slug
      ? slugify(req.body.slug, { replacement: '-', lower: true })
      : slugify(req.body.name, { replacement: '-', lower: true }),
    content: req.body.content,
  };

  if (req.body.heroImageLinkTo) {
    data.heroImageLinkTo = req.body.heroImageLinkTo;
  }

  if (req.file) {
    data.heroImage = req.file.filename;
  }

  console.log(data);
  Page.findOneAndUpdate({ _id: data._id }, data, {
    returnOriginal: false,
  }).exec((err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    res.status(200).json(result);
  });
};

exports.deletePage = (req, res) => {
  Page.findOneAndDelete({ _id: req.params.id }).exec((err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    res.status(200).json({ msg: 'deleted successfully' });
  });
};

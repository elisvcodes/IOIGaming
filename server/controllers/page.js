const Page = require('../models/page');
const slugify = require('slugify');
const cloud = require('../middleware/cloudinaryConfig');

exports.createPage = async (req, res) => {
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
    let attempt = {
      imageName: req.file.originalname,
      imageUrl: req.file.path,
      imageId: "",
    };

    const img = await cloud.uploads(attempt.imageUrl).then(result => {
      let imageDetails = {
        imageName: req.file.originalname,
        imageUrl: result.url,
        imageId: result.id,
      };

      return imageDetails
    })
    data.heroImage = img;

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

exports.getPage = (req, res) => {
  Page.findOne({ slug: req.params.slug }).exec((err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    res.status(200).json(result);
  });
};

exports.updatePage = async(req, res) => {
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
    let attempt = {
      imageName: req.file.originalname,
      imageUrl: req.file.path,
      imageId: "",
    };

    const img = await cloud.uploads(attempt.imageUrl).then(result => {
      let imageDetails = {
        imageName: req.file.originalname,
        imageUrl: result.url,
        imageId: result.id,
      };

      return imageDetails
    })
    data.heroImage = img;
  }

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

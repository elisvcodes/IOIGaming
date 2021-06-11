const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.protected = (req, res, next) => {
  if (req.headers.authorization === 'undefined') {
    return res.status(402).json({ msg: 'Not authorized' });
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  const decoded = jwt.verify(token, 'hello');

  User.findOne({ _id: decoded._id, 'tokens.token': token }).exec(
    (err, user) => {
      if (err) {
        return res.status(400).json({ msg: 'No user was found' });
      }
      req.user = user;
      next();
    }
  );
};

const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.protected = (req, res, next) => {
  if (req.cookies.user_token_jwt === undefined) {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  const token = req.cookies.user_token_jwt;
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

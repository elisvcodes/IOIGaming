const User = require('../models/user');

exports.createUser = (req, res) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    result.generateToken();
    res.status(200).json(result);
  });
};

const User = require('../models/user');

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    result.generateToken();
    res.status(200).json(result);
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec(async (err, user) => {
    if (err) {
      return res.status(400).json(err);
    }
    const correctPassword = await user.checkPassword(password);
    if (correctPassword) {
      user.generateToken();
      res.status(200).json(user);
    } else {
      res.status(200).json('Bad Login');
    }
  });
};

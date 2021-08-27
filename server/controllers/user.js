const User = require('../models/user');

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    result.generateToken();
    const token = result.tokens[result.tokens.length - 1].token;
    res
      .status(200)
      .cookie('user_token_jwt', token, { secure: true })
      .json(result);
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
      const token = user.tokens[user.tokens.length - 1].token;
      res
        .status(200)
        .cookie('user_token_jwt', token, {
          domain: '.elisv.com',
          secure: true,
          SameSite: 'lax',
        })
        .json(user);
    } else {
      res.status(200).json('Bad Login');
    }
  });
};

exports.logout = (req, res) => {
  User.findOne({ _id: req.user._id }).exec((err, user) => {
    if (err) {
      return res.status(400).json(err);
    }
    user.tokens = user.tokens.filter(
      (token) => token.token !== req.cookies.user_token_jwt
    );
    user.save((err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      res
        .status(200)
        .clearCookie('user_token_jwt', {
          domain: '.elisv.com',
          secure: true,
          SameSite: 'lax',
        })
        .json({ msg: 'Logged out successfully' });
    });
  });
};

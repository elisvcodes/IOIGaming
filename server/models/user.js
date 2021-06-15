const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    tokens: [
      {
        token: String,
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, 'hello');
  this.tokens = this.tokens.concat({ token });
  this.save();
};

userSchema.methods.checkPassword = async function (password) {
  const valid = await bcrypt.compare(password, this.password);
  if (valid) {
    return true;
  } else {
    return false;
  }
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

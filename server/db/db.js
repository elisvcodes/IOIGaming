const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://user:123@cluster0.i8l45.mongodb.net/zebraShop?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

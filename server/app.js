const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
require('dotenv').config();

require('./db/db');

const PORT = process.env.PORT || 7000;

// required Middlewares
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://ioi-admin.elisv.com',
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

// User Middleware
app.use('/api/v1/user', require('./routes/user'));

// Category middleware
app.use('/api/v1/category', require('./routes/category'));

// Product middleware
app.use('/api/v1/product', require('./routes/product'));

// Cart middleware
app.use('/api/v1/cart', require('./routes/cart'));

// Page middleware
app.use('/api/v1/page', require('./routes/page'));

// Payments middleware
app.use('/api/v1/payments', require('./routes/payment'));

// Order middleware
app.use('/api/v1/orders', require('./routes/order'));

app.listen(PORT);

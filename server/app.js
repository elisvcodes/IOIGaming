const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
require('dotenv').config();

require('./db/db');
const PORT = process.env.PORT || 8000;
// required Middlewares
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001'],
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
app.use('/api/v1/payments', require('./routes/payments'));

// Orders middleware
// app.use('/api/v1/orders', require('./routes/orders'));

app.listen(PORT);

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

require('./db/db');

// required Middlewares
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// User Middleware
app.use('/api/v1/user', require('./routes/user'));

// Category middleware
app.use('/api/v1/category', require('./routes/category'));

// Product middleware
app.use('/api/v1/product', require('./routes/product'));

// Cart middleware
app.use('/api/v1/cart', require('./routes/cart'));

app.listen(7000);

const express = require('express');
const cors = require('cors');

const app = express();

require('./db/db');

// required Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// User Middleware
app.use('/api/v1/user', require('./routes/user'));

// Category middleware
app.use('/api/v1/category', require('./routes/category'));

// Product middleware
app.use('/api/v1/product', require('./routes/product'));

app.listen(7000);

const express = require('express');
const cors = require('cors');

const app = express();

require('./db/db');

// required Middlewares
app.use(cors());
app.use(express.json());

// User Middleware
app.use('/api/v1/user', require('./routes/user'));

app.listen(7000);

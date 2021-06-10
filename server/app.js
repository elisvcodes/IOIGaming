const express = require('express');
const cors = require('cors');

const app = express();

require('./db/db');

app.use(cors());

app.listen(7000);

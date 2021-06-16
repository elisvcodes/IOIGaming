const express = require('express');
const router = express.Router();

const { signup, login, logout } = require('../controllers/user');
const { protected } = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', protected, logout);
module.exports = router;

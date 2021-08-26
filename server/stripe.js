const stripe = require('stripe')(process.env.STRIEP_S_KEY);
module.exports = stripe;

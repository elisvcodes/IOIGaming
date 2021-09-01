const stripe = require('stripe')(process.env.STRIPE_S_KEY);
module.exports = stripe;

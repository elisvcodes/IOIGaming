const express = require('express');
const router = express.Router();
const stripe = require('../stripe');

router.post('/payment', async (req, res) => {
  const { total } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(total * 100),
    currency: 'usd',
  });
  res.json({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;

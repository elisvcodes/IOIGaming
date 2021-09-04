const Order = require('../models/order');
const mongoose = require('mongoose');

const populateEmptyDays = (resultsFromRes) => {
  let results = resultsFromRes;
  let hasResult = [];
  for (let result of results) {
    hasResult.push(result._id);
  }

  for (let i = 1; i <= 7; i++) {
    if (!hasResult.includes(i)) {
      results.push({ _id: i, orders: 0 });
    }
  }
  return results;
};

const compare = (a, b) => {
  if (a._id < b._id) {
    return -1;
  }
  if (a._id > b._id) {
    return 1;
  }
  return 0;
};

exports.createOrder = (req, res) => {
  const { firstName, lastName, address, apt, zip, city, state, email, phone } =
    req.body.customerInfo;
  const data = {
    firstName,
    lastName,
    address,
    apt,
    zip,
    city,
    state,
    email,
    phone,
    itemsOrdered: req.body.itemsOrdered,
    orderTotal: req.body.orderTotal,
  };

  const order = new Order(data);
  order.save((err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    res.status(200).json(result.orderNumber);
  });
};

exports.getOrders = (req, res) => {
  Order.find({})
    .populate({ path: 'itemsOrdered.item' })
    .sort({ createdAt: -1 })
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      res.status(200).json(result);
    });
};

exports.updateOrder = (req, res) => {
  Order.findByIdAndUpdate({ _id: req.body._id }, req.body, {
    returnOriginal: false,
  });
};

exports.weeklyOrdersGraph = (req, res) => {
  Order.aggregate([
    {
      $group: {
        _id: {
          $dayOfWeek: { date: '$createdAt', timezone: 'America/New_York' },
        },
        orders: { $sum: 1 },
      },
    },
  ]).exec((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    const resultsWithEmptyDays = populateEmptyDays(result);
    resultsWithEmptyDays.sort(compare);
    res.status(200).json(resultsWithEmptyDays);
  });
};

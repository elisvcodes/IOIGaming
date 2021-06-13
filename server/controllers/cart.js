const Cart = require('../models/cart');

exports.addToCart = (req, res) => {
  const data = {
    item: req.body.item,
    quantity: req.body.quantity,
  };

  Cart.findOne({ owner: req.body.owner }).exec((err, cart) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (cart) {
      const foundItem = cart.items.find((item) => item.item == data.item);
      if (foundItem) {
        cart.items = cart.items.map((item) =>
          item.item == data.item ? data : item
        );
        cart.save((err, result) => {
          if (err) {
            return res.status(400).json(err);
          }
          res.status(200).json(result);
        });
      } else {
        cart.items = cart.items.concat(data);
        cart.save((err, result) => {
          if (err) {
            return res.status(400).json(err);
          }
          res.status(200).json(result);
        });
      }
    } else {
      const newCart = new Cart({
        owner: req.body.owner,
        items: data,
      });
      newCart.save((err, result) => {
        if (err) {
          return res.status(400).json(err);
        }
        res.status(200).json(result);
      });
    }
  });
};

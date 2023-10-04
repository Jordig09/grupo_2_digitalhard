const database = require("../database/database");

const controller = {
  index: (req, res) => {
    let products = [];
    for (let i = 0; i < 3; i++) {
      products.push({
        ...database.products[i],
        amount: Math.floor(Math.random() * 2 + 1),
      });
    }
    let subtotal = products.reduce(
      (subtotal, prod) => subtotal + prod.price * prod.amount,
      0
    );
    let discount = products.reduce(
      (discount, prod) =>
        discount + prod.price * prod.amount * (prod.discount / 100),
      0
    );

    res.render("cart.ejs", {
      cart: {
        products,
        subtotal,
        discount,
        total: subtotal - discount,
      },
    });
  },
};

module.exports = controller;

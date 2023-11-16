const database = require("../data/database");

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
      styles: [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "/css/normalize.css",
        "/css/styles.css",
      ],
    });
  },
};

module.exports = controller;

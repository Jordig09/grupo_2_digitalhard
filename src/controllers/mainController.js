const database = require("../database/database");

const controller = {
  index: (req, res) => {
    let j = 0;
    let products = [];
    while (products.length < 4 && j < database.products.length) {
      let prod =
        database.products[Math.floor(Math.random() * database.products.length)];
      products.includes(prod) ? "" : products.push(prod);
    }

    let i = 0;
    let productsOff = [];
    while (productsOff.length < 4 && i < database.products.length) {
      if (database.products[i].discount) productsOff.push(database.products[i]);
      i++;
    }

    res.render("main.ejs", { products, productsOff });
  },
};

module.exports = controller;

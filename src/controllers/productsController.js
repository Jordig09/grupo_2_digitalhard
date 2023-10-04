const database = require("../database/database");

const controller = {
  index: (req, res) => {
    res.render("productList.ejs", { products: database.products });
  },
  getProduct: (req, res) => {
    let products = [];
    for (let i = 0; i < 4; i++) {
      products.push(database.products[i]);
    }

    res.render("productDetail.ejs", {
      product: database.products.find((prod) => prod.id == req.params.id),
      products,
    });
  },
};

module.exports = controller;

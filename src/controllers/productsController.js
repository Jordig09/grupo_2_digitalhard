const database = require("../database/database");

const controller = {
  index: (req, res) => {
    res.render("productList.ejs", {
      products: database.products,
      styles: [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "/css/normalize.css",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",
        "css/styles.css",
        "css/productList.css",
      ],
    });
  },
  getProduct: (req, res) => {
    let products = [];
    for (let i = 0; i < 4; i++) {
      products.push(database.products[i]);
    }

    res.render("productDetail.ejs", {
      product: database.products.find((prod) => prod.id == req.params.id),
      products,
      styles: [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "/css/normalize.css",
        "/css/styles.css",
        "/css/productDetail.css",
        "/css/productList.css",
      ],
    });
  },
};

module.exports = controller;

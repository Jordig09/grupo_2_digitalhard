const database = require("../database/database");

const controller = {
  index: (req, res) => {
    res.render("editProduct", {
      categories: database.categories,
      brands: database.brands,
      styles: [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "/css/normalize.css",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",
        "/css/styles.css",
        "/css/editProduct.css",
      ],
    });
  },
  getProduct: (req, res) => {
    res.render("editProduct", {
      product: database.products.find((prod) => prod.id == req.params.id),
      categories: database.categories,
      brands: database.brands,
      styles: [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "/css/normalize.css",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",
        "/css/styles.css",
        "/css/editProduct.css",
      ],
    });
  },
};

module.exports = controller;

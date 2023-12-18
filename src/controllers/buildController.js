const db = require("../database/models");

const controller = {
  index: async (req, res) => {
    try {
      const products = await db.Product.findAll();
      res.render("build.ejs", {
        products,
        styles: [
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
          "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
          "/css/normalize.css",
          "/css/styles.css",
          "/css/build.css",
        ],
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = controller;

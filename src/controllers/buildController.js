const database = require("../data/database");

const controller = {
  index: (req, res) => {
    res.render("build.ejs", {
      products: database.products,
      styles: [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "/css/normalize.css",
        "/css/styles.css",
        "/css/build.css",
      ],
    });
  },
};

module.exports = controller;

const database = require("../database/database");

const controller = {
  index: (req, res) => {
    res.render("build.ejs", { products: database.products });
  },
};

module.exports = controller;

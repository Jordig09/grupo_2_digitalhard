const fs = require("fs");
const path = require("path");

const products = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./products.json"))
);

const categories = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./categoriesNew.json"))
);

const brands = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./brands.json"))
);

module.exports = { products, categories, brands };

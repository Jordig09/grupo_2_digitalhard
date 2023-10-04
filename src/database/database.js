const fs = require("fs");
const path = require("path");

const products = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./products.json"))
);

const categories = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./categories.json"))
);

module.exports = { products, categories };

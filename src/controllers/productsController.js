const database = require("../data/database");

const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");

function getProducts() {
  const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
  return products;
}

const controller = {
  index: (req, res) => {
    const products = getProducts();
    res.render("products.ejs", {
      products,
      styles: [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "/css/normalize.css",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",
        "/css/styles.css",
        "/css/productList.css",
      ],
    });
  },
  create: (req, res) => {
    res.render("product-create-form", {
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
  detail: (req, res) => {
    const products = getProducts();
    res.render("detail", {
      product: products.find((prod) => prod.id == req.params.id),
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
  store: (req, res) => {
    const products = getProducts();
    req.body.categories = req.body.categories.map(Number);
    req.body.brand = Number(req.body.brand);
    req.body.price = Number(req.body.price);
    req.body.discount = Number(req.body.discount);
    req.body.stock = Number(req.body.stock);
    const productToCreate = {
      id: products[products.length - 1].id + 1,
      images: "default-image.png",
      ...req.body,
    };
    products.push(productToCreate);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.redirect("/products");
  },
  edit: (req, res) => {
    const products = getProducts();
    res.render("product-edit-form", {
      product: products.find((prod) => prod.id == req.params.id),
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
  update: (req, res) => {
    const products = getProducts();
    const indexProduct = products.findIndex(
      (product) => product.id == req.params.id
    );
    req.body.categories = req.body.categories.map(Number);
    req.body.brand = Number(req.body.brand);
    req.body.price = Number(req.body.price);
    req.body.discount = Number(req.body.discount);
    req.body.stock = Number(req.body.stock);
    products[indexProduct] = {
      ...products[indexProduct],
      ...req.body,
    };
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.redirect("/products");
  },
  destroy: (req, res) => {
    const products = getProducts();
    const indexProduct = products.findIndex(
      (product) => product.id == req.params.id
    );
    products.splice(indexProduct, 1);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.redirect("/products");
  },
};

module.exports = controller;

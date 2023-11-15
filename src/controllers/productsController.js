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
    try {
      const products = getProducts();
      const files = req.files;
      req.body.categories = Array.isArray(req.body.categories)
        ? req.body.categories.map(Number)
        : [Number(req.body.categories)];
      req.body.brand = Number(req.body.brand);
      req.body.price = Number(req.body.price);
      req.body.discount = Number(req.body.discount);
      req.body.stock = Number(req.body.stock);
      const productToCreate = {
        id: products[products.length - 1].id + 1,
        images:
          req.files.length > 0
            ? req.files.map(
                (file) => `/images/products-images/${file.filename}`
              )
            : ["/images/products-images/default-product.jpg"],
        ...req.body,
      };
      products.push(productToCreate);
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
      res.redirect("/products");
    } catch (error) {
      for (let file of req.files) {
        fs.unlink(
          path.join("./src/public/images/products-images", file.filename),
          (err) => {
            if (err) console.error(err);
          }
        );
        res.status(500).send("Hubo un error al guardar los datos");
      }
    }
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
    if (req.files) {
      products[indexProduct].images[0] =
        "/images/products-images/default-product.jpg"
          ? (products[indexProduct].images = req.files.map(
              (file) => `/images/products-images/${file.filename}`
            ))
          : req.files.forEach((file) => {
              products[indexProduct].images.push(
                `/images/products-images/${file.filename}`
              );
            });
    }
    if (req.body.deleteImages) {
      if (!Array.isArray(req.body.deleteImages))
        req.body.deleteImages = [req.body.deleteImages];
      req.body.deleteImages.forEach((image) => {
        fs.unlink(path.join("./src/public", image), (err) => {
          if (err) console.error(err);
        });
        const index = products[indexProduct].images.indexOf(image);
        products[indexProduct].images.splice(index, 1); // Elimina las imágenes del producto
      });
      delete req.body.deleteImages;
    }
    req.body.images =
      products[indexProduct].images != ""
        ? products[indexProduct].images
        : ["/images/products-images/default-product.jpg"];
    req.body.categories = Array.isArray(req.body.categories)
      ? req.body.categories.map(Number)
      : [Number(req.body.categories)];
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
    const product = products[indexProduct];
    product.images.forEach((image) => {
      fs.unlink(path.join("./src/public", image), (err) => {
        if (err) console.error(err);
      });
    });
    products.splice(indexProduct, 1);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.redirect("/products");
  },
};

module.exports = controller;

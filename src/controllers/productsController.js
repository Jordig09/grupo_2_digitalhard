const { Op } = require("sequelize");
const db = require("../database/models");
const fs = require("fs");

const path = require("path");

const controller = {
  index: async (req, res) => {
    try {
      const products = await db.Product.findAll();
      res.render("products.ejs", {
        products: products,
        styles: [
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
          "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
          "/css/normalize.css",
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",
          "/css/styles.css",
          "/css/productList.css",
        ],
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  create: async (req, res) => {
    try {
      const [categories, brands] = await Promise.all([
        db.Category.findAll({ include: ["subcategories"] }),
        db.Brand.findAll(),
      ]);
      res.render("product-create-form", {
        styles: [
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
          "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
          "/css/normalize.css",
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",
          "/css/styles.css",
          "/css/editProduct.css",
        ],
        categories: categories,
        brands: brands,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  detail: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: [{ association: "images" }],
      });
      product.specification = [];

      // const products = await db.Product.findAll({ limit: 4 });
      res.render("detail", {
        product,
        products: [],
        styles: [
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
          "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
          "/css/normalize.css",
          "/css/styles.css",
          "/css/productDetail.css",
          "/css/productList.css",
        ],
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  store: async (req, res) => {
    try {
      res.send({ ...req.body });
      // const {
      //   name,
      //   brand,
      //   price,
      //   discount,
      //   stock,
      //   description,
      //   subcategories,
      //   nameSpecification,
      //   textSpecification,
      // } = req.body;
      // const specification = [];
      // if (nameSpecification.length == textSpecification.length) {
      //   for (let i = 0; i < nameSpecification.length; i++) {
      //     specification.push({
      //       name: nameSpecification[i],
      //       text: textSpecification[i],
      //     });
      //   }
      // }
      // const subcategory_id = +subcategories;
      // const mainImage = req.files.find((file) => file.fieldname == "mainImage");
      // const subcategory = await db.Subcategory.findByPk(subcategory_id);
      // const newProduct = {
      //   name,
      //   description,
      //   brand_id: +brand,
      //   price: +price,
      //   discount: +discount,
      //   stock: +stock,
      //   subcategory_id,
      //   category_id: subcategory.category_id,
      //   mainImage: mainImage.filename,
      //   specification,
      // };

      res.send(specification);
      // const product = await db.Product.create(newProduct);

      // req.files.forEach(async (file) => {
      //   if (file.fieldname == "images") {
      //     let image = await db.Image.create({ url: file.filename });

      //     await db.ImageProduct.create({
      //       image_id: image.id,
      //       product_id: product.id,
      //     });
      //   }
      // });
      // res.redirect("/products");
    } catch (error) {
      for (let file of req.files) {
        fs.unlink(
          path.join("./src/public/images/products", file.filename),
          (err) => {
            if (err) console.error(err);
          }
        );
        res.status(500).send(error);
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

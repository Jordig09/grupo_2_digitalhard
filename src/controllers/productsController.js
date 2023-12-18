const db = require("../database/models");
const fs = require("fs");

const path = require("path");
const { Op } = require("sequelize");

function getSpecification(req) {
  const specification = [];
  let reqSpecification = req.body[`specification-title`] || [];
  if (!Array.isArray(reqSpecification)) reqSpecification = [reqSpecification];
  reqSpecification.forEach((data, i) => {
    specification.push({
      title: data,
      specifications: [],
    });
    let names = req.body[`specification-name-${i}`] || [];
    let texts = req.body[`specification-text-${i}`] || [];
    if (!Array.isArray(names)) names = [names];
    if (!Array.isArray(texts)) texts = [texts];
    for (let j = 0; j < names.length; j++) {
      specification[i].specifications.push({
        name: names[j],
        text: texts[j],
      });
    }
  });

  let toDelete = req.body.deleteSpecifications || [];
  if (toDelete && !Array.isArray(toDelete)) toDelete = [toDelete];

  const toUpdate = [];
  if (req.body.idUpdate) {
    let idsToUpdate = req.body.idUpdate;
    if (!Array.isArray(idsToUpdate)) idsToUpdate = [idsToUpdate];
    idsToUpdate.forEach((data) => {
      if (!toDelete.includes(data)) {
        let newName = req.body[`nameUpdate-${data}`];
        let newText = req.body[`textUpdate-${data}`];
        toUpdate.push({
          id: data,
          name: newName,
          text: newText,
        });
      }
    });
  }

  return {
    specification,
    toDelete,
    toUpdate,
  };
}

const controller = {
  index: async (req, res) => {
    try {
      const products = await db.Product.findAll();
      const [categories, brands] = await Promise.all([
        db.Category.findAll({ include: ["subcategories"] }),
        db.Brand.findAll(),
      ]);
      res.render("products.ejs", {
        products,
        categories,
        brands,
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
  store: async (req, res) => {
    try {
      const { name, brand, price, discount, stock, description, subcategory } =
        req.body;
      const { specification } = getSpecification(req);
      const subcategories_id = +subcategory;
      const mainImage = req.files.find((file) => file.fieldname == "mainImage");
      const subcategoryDB = await db.Subcategory.findByPk(subcategories_id);
      const newProduct = {
        name,
        description,
        brands_id: +brand,
        price: +price,
        discount: +discount,
        stock: +stock,
        subcategories_id,
        categories_id: subcategoryDB.categories_id,
        mainImage: mainImage.filename,
      };

      const product = await db.Product.create(newProduct);
      req.files.forEach(async (file) => {
        if (file.fieldname == "images") {
          await db.Image.create({
            url: file.filename,
            products_id: product.id,
          });
        }
      });
      specification.forEach(async (spec) => {
        let title =
          (await db.Specification.findOne({
            where: { title: spec.title },
          })) || (await db.Specification.create({ title: spec.title }));
        spec.specifications.forEach(async (data) => {
          await db.SpecificationDetails.create({
            name: data.name,
            text: data.text,
            products_id: product.id,
            specifications_id: title.dataValues.id,
          });
        });
      });
      res.redirect("/products");
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
  detail: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: [
          "images",
          {
            model: db.Subcategory,
            as: "subcategory",
            include: [
              {
                model: db.Category,
                as: "category",
              },
            ],
          },
          {
            model: db.SpecificationDetails,
            as: "specification",
            include: [
              {
                model: db.Specification,
                as: "specification",
              },
            ],
          },
        ],
      });
      const specifications = [];
      product.specification.forEach((data) => {
        let index = specifications.findIndex(
          (i) => i.id == data.specification.id
        );
        if (index == -1)
          specifications.push({
            id: data.specification.id,
            title: data.specification.title,
            detail: [data],
          });
        else specifications[index].detail.push(data);
      });
      const products = await db.Product.findAll({ limit: 4 });
      res.render("detail", {
        product,
        specifications,
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
    } catch (error) {
      res.status(500).send(error);
    }
  },
  edit: async (req, res) => {
    try {
      const [categories, brands] = await Promise.all([
        db.Category.findAll({ include: ["subcategories"] }),
        db.Brand.findAll(),
      ]);
      const product = await db.Product.findByPk(req.params.id, {
        include: [
          "images",
          {
            model: db.Subcategory,
            as: "subcategory",
            include: [
              {
                model: db.Category,
                as: "category",
              },
            ],
          },
          {
            model: db.SpecificationDetails,
            as: "specification",
            include: [
              {
                model: db.Specification,
                as: "specification",
              },
            ],
          },
        ],
      });
      const specifications = [];
      product.specification.forEach((data) => {
        let index = specifications.findIndex(
          (i) => i.id == data.specification.id
        );
        if (index == -1)
          specifications.push({
            id: data.specification.id,
            title: data.specification.title,
            detail: [data],
          });
        else specifications[index].detail.push(data);
      });
      res.render("product-edit-form", {
        product,
        specifications,
        categories,
        brands,
        styles: [
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
          "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
          "/css/normalize.css",
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",
          "/css/styles.css",
          "/css/editProduct.css",
        ],
      });
    } catch (error) {
      res.status(500).send(error);
    }
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
};

module.exports = controller;

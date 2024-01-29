const db = require("../database/models");
const fs = require("fs");
const { validationResult } = require("express-validator");

const path = require("path");
const { Op } = require("sequelize");

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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const [categories, brands] = await Promise.all([
          db.Category.findAll({ include: ["subcategories"] }),
          db.Brand.findAll(),
        ]);
        return res.render("product-create-form", {
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
          errors: errors.mapped(),
          oldData: req.body,
        });
      }
      const {
        name,
        brand,
        price,
        discount,
        stock,
        description,
        subcategory,
        specification,
      } = req.body;
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
        mainImage: mainImage ? mainImage.filename : "default.jpg",
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
        spec.detail.forEach(async (data) => {
          await db.SpecificationDetails.create({
            name: data.name,
            text: data.text,
            products_id: product.id,
            specifications_id: title.dataValues.id,
          });
        });
      });
      return res.redirect("/products");
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
      if(product){
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
      }
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
  update: async (req, res) => {
    try {
      const errors = validationResult(req);
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
        ],
      });
      if (!errors.isEmpty()) {
        const [categories, brands] = await Promise.all([
          db.Category.findAll({ include: ["subcategories"] }),
          db.Brand.findAll(),
        ]);
        return res.render("product-edit-form", {
          product,
          categories,
          brands,
          errors: errors.mapped(),
          oldData: req.body,
          styles: [
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
            "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
            "/css/normalize.css",
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",
            "/css/styles.css",
            "/css/editProduct.css",
          ],
        });
      }
      const {
        name,
        brand,
        price,
        discount,
        stock,
        description,
        subcategory,
        specification,
        toDelete,
        toUpdate,
      } = req.body;

      await toDelete.forEach(async (id) => {
        await db.SpecificationDetails.destroy({ where: { id } });
      });
      for (let i = 0; i < toUpdate.length; i++) {
        await db.SpecificationDetails.update(
          { name: toUpdate[i].name, text: toUpdate[i].text },
          { where: { id: toUpdate[i].id } }
        );
      }
      for (let i = 0; i < specification.length; i++) {
        for (let j = 0; j < specification[i].detail.length; j++) {
          const findSpec = await db.SpecificationDetails.findOne({
            where: {
              [Op.and]: [
                { products_id: Number(req.params.id) },
                { name: specification[i].detail[j].name },
                { text: specification[i].detail[j].text },
              ],
            },
          });
          if (!findSpec) {
            let title =
              (await db.Specification.findOne({
                where: { title: specification[i].title },
              })) ||
              (await db.Specification.create({
                title: specification[i].title,
              }));
            await db.SpecificationDetails.create({
              name: specification[i].detail[j].name,
              text: specification[i].detail[j].text,
              products_id: req.params.id,
              specifications_id: title.dataValues.id,
            });
          } else {
            if (specification[i].title != findSpec.title) {
              let title =
                (await db.Specification.findOne({
                  where: { title: specification[i].title },
                })) ||
                (await db.Specification.create({
                  title: specification[i].title,
                }));
              await db.SpecificationDetails.update(
                { specifications_id: title.dataValues.id },
                { where: { id: findSpec.id } }
              );
            }
          }
        }
      }
      const subcategories_id = +subcategory;
      const productUpdate = {
        name,
        description,
        brands_id: +brand,
        price: +price,
        discount: +discount,
        stock: +stock,
        subcategories_id,
      };
      const mainImage = req.files.find((file) => file.fieldname == "mainImage");
      if (
        req.body.deleteImages &&
        req.body.deleteImages.includes(product.mainImage)
      )
        productUpdate.mainImage = "default.jpg";
      if (mainImage) productUpdate.mainImage = mainImage.filename;
      req.files.forEach(async (file) => {
        if (file.fieldname == "images") {
          await db.Image.create({
            url: file.filename,
            products_id: Number(req.params.id),
          });
        }
      });
      if (req.body.deleteImages) {
        if (!Array.isArray(req.body.deleteImages))
          req.body.deleteImages = [req.body.deleteImages];
        req.body.deleteImages.forEach(async (image) => {
          if (image != "default.jpg") {
            await db.Image.destroy({ where: { url: image } });
            fs.unlink(
              path.join("./src/public/images/products/", image),
              (err) => {
                if (err) console.error(err);
              }
            );
          }
        });
        delete req.body.deleteImages;
      }
      await db.Product.update(
        { ...productUpdate },
        { where: { id: req.params.id } }
      );

      res.redirect(`/products/${req.params.id}`);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  destroy: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: ["images", "specification"],
      });
      product.images.forEach(async (image) => {
        await db.Image.destroy({ where: { products_id: req.params.id } });
        fs.unlink(
          path.join("./src/public/images/products/", image.url),
          (err) => {
            if (err) console.error(err);
          }
        );
      });
      if (product.mainImage != "default.jpg") {
        fs.unlink(
          path.join("./src/public/images/products/", product.mainImage),
          (err) => {
            if (err) console.error(err);
          }
        );
      }
      await db.SpecificationDetails.destroy({
        where: { products_id: req.params.id },
      });
      await db.Product.destroy({ where: { id: req.params.id } });
      res.redirect("/products");
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = controller;

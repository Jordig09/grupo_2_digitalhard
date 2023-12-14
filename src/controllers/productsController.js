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
      const subcategory_id = +subcategory;
      const mainImage = req.files.find((file) => file.fieldname == "mainImage");
      const subcategoryDB = await db.Subcategory.findByPk(subcategory_id);
      const newProduct = {
        name,
        description,
        brand_id: +brand,
        price: +price,
        discount: +discount,
        stock: +stock,
        subcategory_id,
        category_id: subcategoryDB.category_id,
        mainImage: mainImage.filename,
      };

      const product = await db.Product.create(newProduct);
      req.files.forEach(async (file) => {
        if (file.fieldname == "images") {
          await db.Image.create({ url: file.filename, product_id: product.id });
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
            product_id: product.id,
            specification_id: title.dataValues.id,
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
          "category",
          "subcategory",
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
          "category",
          "subcategory",
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
      const { name, brand, price, discount, stock, description, subcategory } =
        req.body;
      let { specification, toDelete, toUpdate } = getSpecification(req);

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
        for (let j = 0; j < specification[i].specifications.length; j++) {
          const findSpec = await db.SpecificationDetails.findOne({
            where: {
              [Op.and]: [
                { product_id: Number(req.params.id) },
                { name: specification[i].specifications[j].name },
                { text: specification[i].specifications[j].text },
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
              name: specification[i].specifications[j].name,
              text: specification[i].specifications[j].text,
              product_id: req.params.id,
              specification_id: title.dataValues.id,
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
                { specification_id: title.dataValues.id },
                { where: { id: findSpec.id } }
              );
            }
          }
        }
      }
      const subcategory_id = +subcategory;
      const mainImage = req.files.find((file) => file.fieldname == "mainImage");
      const subcategoryDB = await db.Subcategory.findByPk(subcategory_id);
      const productUpdate = {
        name,
        description,
        brand_id: +brand,
        price: +price,
        discount: +discount,
        stock: +stock,
        subcategory_id,
        category_id: +subcategoryDB.category_id,
        mainImage: mainImage ? mainImage.filename : null,
      };
      req.files.forEach(async (file) => {
        if (file.fieldname == "images") {
          await db.Image.create({
            url: file.filename,
            product_id: Number(req.params.id),
          });
        }
      });
      if (req.body.deleteImages) {
        if (!Array.isArray(req.body.deleteImages))
          req.body.deleteImages = [req.body.deleteImages];
        req.body.deleteImages.forEach(async (image) => {
          await db.Image.destroy({ where: { url: image } });
          fs.unlink(
            path.join("./src/public/images/products/", image),
            (err) => {
              if (err) console.error(err);
            }
          );
        });
        delete req.body.deleteImages;
      }
      await db.Product.update(
        { ...productUpdate },
        { where: { id: req.params.id } }
      );

      res.redirect(`/products/${req.params.id}/edit`);
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
        await db.Image.destroy({ where: { product_id: req.params.id } });
        fs.unlink(
          path.join("./src/public/images/products/", image.url),
          (err) => {
            if (err) console.error(err);
          }
        );
      });
      fs.unlink(
        path.join("./src/public/images/products/", product.mainImage),
        (err) => {
          if (err) console.error(err);
        }
      );
      await db.SpecificationDetails.destroy({
        where: { product_id: req.params.id },
      });
      await db.Product.destroy({ where: { id: req.params.id } });
      res.redirect("/products");
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = controller;

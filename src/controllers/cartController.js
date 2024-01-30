const db = require("../database/models");

const { Op } = require("sequelize");

const controller = {
  index: async (req, res) => {
    try {
      const cart = await db.Cart.findOne({
        where: { users_id: req.session._id },
      });
      const cartDetail = cart
        ? await db.CartDetails.findAll({
            where: { carts_id: cart.id },
            include: ["product"],
          })
        : null;
      let subtotal = cartDetail
        ? cartDetail.reduce(
            (subtotal, detail) =>
              subtotal + detail.product.price * detail.quantity,
            0
          )
        : 0;
      let discount = cartDetail
        ? cartDetail.reduce(
            (discount, detail) =>
              discount +
              detail.product.price *
                detail.quantity *
                (detail.product.discount / 100),
            0
          )
        : 0;
      res.render("cart.ejs", {
        cartDetail,
        subtotal,
        discount,
        total: subtotal - discount,
        styles: [
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
          "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
          "/css/normalize.css",
          "/css/styles.css",
        ],
      });
    } catch (error) {
      res.send(error);
    }
  },
  addProduct: async (req, res) => {
    try {
      const { quantity, products_id } = req.body;
      const cart = await db.Cart.findOne({
        where: { users_id: req.session._id },
      });
      const findProduct = await db.CartDetails.findOne({
        where: {
          [Op.and]: [{ carts_id: cart.id }, { products_id: products_id }],
        },
      });
      if (!findProduct) {
        await db.CartDetails.create({
          carts_id: cart.id,
          products_id,
          quantity,
        });
      } else {
        await db.CartDetails.update(
          {
            carts_id: cart.id,
            products_id,
            quantity: findProduct.quantity + quantity,
          },
          {
            where: {
              [Op.and]: [{ carts_id: cart.id }, { products_id: products_id }],
            },
          }
        );
      }
    } catch (error) {
      res.send(error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { products_id } = req.params;
      const cart = await db.Cart.findOne({
        where: { users_id: req.session._id },
      });
      await db.CartDetails.destroy({
        where: {
          [Op.and]: [{ carts_id: cart.id }, { products_id: products_id }],
        },
      });
      res.redirect("/cart");
    } catch (error) {
      res.send(error);
    }
  },
  checkout: async (req, res) => {
    try {
      const cart = await db.Cart.findOne({
        where: { users_id: req.session._id },
      });
      await db.CartDetails.destroy({
        where: {
          carts_id: cart.id,
        },
      });
      res.redirect("/")
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = controller;

const { body } = require("express-validator");
// const db = require("../database/models");

const createProductValidation = [
  body("name")
    .notEmpty()
    .withMessage("El Campo nombre es requerido.")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener mas de dos caracteres."),
  body("brand").notEmpty().withMessage("El Campo Marca es requerido."),
  body("price")
    .notEmpty()
    .withMessage("El Campo email es requerido.")
    .isNumeric()
    .withMessage("Debes ingresar un valor numerico en el Campo Precio"),
  body("description")
    .isEmpty()
    .withMessage("El Campo descripcion es requerido"),
  body("stock")
    .isEmpty()
    .withMessage("El Campo stock es requerido")
    .isNumeric()
    .withMessage("Debes ingresar un valor numerico en el Campo stock"),
  body("mainImage")
    .isEmpty()
    .withMessage("El Campo imagen pricipal es requerido"),
  body("subcategories").isEmpty().withMessage("Debe seleccionar una categoria"),
];

module.exports = {
  createProductValidation,
};

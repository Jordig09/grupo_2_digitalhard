const { body } = require("express-validator");

const createUserValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("El Campo nombre es requerido.")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener mas de dos caracteres."),
  body("lastName").notEmpty().withMessage("El Campo apellido es requerido."),
  body("email")
    .notEmpty()
    .withMessage("El Campo email es requerido.")
    .isEmail()
    .withMessage(
      "El Campo debe tener el formato de un correo electrónico válido"
    ),
  body("password")
    .notEmpty()
    .withMessage("El password es requerido.")
    .isLength({ min: 8 })
    .withMessage("El password debe tener al menos 8 caracteres."),
];

module.exports = {
  createUserValidation,
};

const { body } = require("express-validator");
const db = require("../database/models");
const bcrypt = require("bcrypt");

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
    )
    .custom(async (value, { req }) => {
      if (await db.User.findOne({ where: { email: value } }))
        throw new Error("Este email ya está registrado");
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("El password es requerido.")
    .isLength({ min: 8 })
    .withMessage("El password debe tener al menos 8 caracteres."),
];

const validateUserLogin = [
  body("email")
    .notEmpty()
    .withMessage("El campo email es requerido.")
    .isEmail()
    .custom(async (value, { req }) => {
      const user = await db.User.findOne({ where: { email: value } });
      if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        throw new Error("Usuario y/o contraseña incorrecto");
      }
      return true;
    }),
];

module.exports = {
  createUserValidation,
  validateUserLogin,
};

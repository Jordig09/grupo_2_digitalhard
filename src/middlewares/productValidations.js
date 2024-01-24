const { body } = require("express-validator");

const productValidation = [
  body("name")
    .notEmpty()
    .withMessage("El Campo nombre es requerido.")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener mas de dos caracteres."),
  body("brand").notEmpty().withMessage("El Campo Marca es requerido."),
  body("price")
    .notEmpty()
    .withMessage("El Campo Precio es requerido.")
    .isNumeric()
    .withMessage("Debes ingresar un valor numerico en el Campo Precio"),
  body("stock")
    .notEmpty()
    .withMessage("El Campo stock es requerido")
    .isNumeric()
    .withMessage("Debes ingresar un valor numerico en el Campo stock"),
  body("subcategory").notEmpty().withMessage("Debe seleccionar una categoria"),
  body("specification").custom((specification, { req }) => {
    if (specification.length > 0) {
      specification.forEach(spec => {
        if(spec.title.trim() == "") throw new Error("Debes completar todos los campos. \nCada especificacion debe contener al menos una fila");
        if(spec.detail.length < 1) throw new Error("Debes completar todos los campos. \nCada especificacion debe contener al menos una fila");
        spec.detail.forEach(data => {
          if(data.name.trim() == "" || data.text.trim() == ""){
            throw new Error("Debes completar todos los campos. \nCada especificacion debe contener al menos una fila");
          }
        })
      });
    }
    return true;
  }),
];
                                                                                                                                                                                            

module.exports = { productValidation };

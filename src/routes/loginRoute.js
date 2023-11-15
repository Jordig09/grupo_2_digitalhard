const express = require("express");
const app = express;
const router = express.Router();
const controller = require("../controllers/loginController");
const { check, validationResult, body } = require("express-validator");

router.get("/", controller.index);

module.exports = router;


router.get("/login", loginController.login)

router.post("/login", [
    check("email").isEmail().withMessage("Email invalido"),
    check("password").isLength({min: 8}).whitMessage("la contraseña debe tener como minimo 8 caracteres")
], loginController.proccesLogin);

router.get("/check", function(req, res){
    if (req.session.usuarioLogueado == undefined) {
        res.send("No estas logueado");
    } else {
        res.send("El usuario logueado es " + req.session.usuarioLogueado.email);
    }
})
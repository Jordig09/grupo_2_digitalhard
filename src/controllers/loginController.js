const express = require ("express");
const app = express;
const bcrypt = require("bcrypt");
const fs = require("fs");
const { check, validationResult, body } = require("express-validator");
const controller = {
  index: (req, res) => {
    res.render("login.ejs", {
      styles: [
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "/css/styles.css",
        "/css/login.css",
      ],
    });
  },
};

let loginController = {
  login: function(req, res) {
    return res.render("login");
  },
  processLogin: function(req, res){
    let errors = validationResult(req);

    if (errors.isEmpty()){
      let usersJSON = fs.readFileSync("users.json", { encoding: "utf-8"})
      let users;
      if (usersJSON == ""){
          users = [];
    } else {
      users = JSON.parse(usersJSON);
    }

      for (let i = 0; i < users.lenght; i++){
          if (users [i].email == req.body.email) {
            if (bcrypt.compareSync(req.body.password, users [i].password)){
                let usuarioALoguearse = users[i];
                break;
            }
          }
      }

      if (usuarioALoguearse){
          return res.render("login", {errors: [
              {msg: "Credenciales invalidas"}
          ]});
      }

      req.session.usuarioLogueado = usuarioALoguearse;

      if (req.body.recordarme != undefined) {
          res.cookie("recordarme",
          usuarioALoguearse.email, { maxAge: 60000 })
      }

      res.render("succes");
    }else {
        return res.render("login", {errors: errors.errors});
    }
  }
}

module.exports = controller;

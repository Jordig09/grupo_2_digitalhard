const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");

const usersDataFilePath = path.join(__dirname, "../data/users.json");
function getUsers() {
  return JSON.parse(fs.readFileSync(usersDataFilePath, "utf-8"));
}

const controller = {
  register: (req, res) => {
    res.render("register.ejs", {
      styles: [
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "/css/styles.css",
        "/css/login.css",
      ],
    });
  },
  registerProcess(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("register.ejs", {
        styles: [
          "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
          "https://fonts.googleapis.com/icon?family=Material+Icons",
          "/css/styles.css",
          "/css/login.css",
        ],
        errors: errors.mapped(),
        oldData: req.body,
      });
    }
    const users = getUsers();

    const userInDB = users.find((u) => u.email === req.body.email);

    if (userInDB) {
      return res.render("register.ejs", {
        styles: [
          "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
          "https://fonts.googleapis.com/icon?family=Material+Icons",
          "/css/styles.css",
          "/css/login.css",
        ],
        errors: {
          email: {
            msg: "Este email ya está registrado",
          },
        },
        oldData: req.body,
      });
    }

    const user = {
      id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
      rol: true,
      avatar: req.file?.filename,
    };
    users.push(user);
    fs.writeFileSync(usersDataFilePath, JSON.stringify(users, null, 4));
    return res.redirect("/");
  },
  login: (req, res) => {
    res.render("login.ejs", {
      styles: [
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "/css/styles.css",
        "/css/login.css",
      ],
    });
  },
  loginProcess(req, res) {
    const users = getUsers();
    const user = users.find((u) => u.email === req.body.email);
    const errors = {
      unauthorized: {
        msg: "Usuario y/o contraseña incorrecto",
      },
    };
    if (!user) {
      return res.render("login", {
        styles: [
          "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
          "https://fonts.googleapis.com/icon?family=Material+Icons",
          "/css/styles.css",
          "/css/login.css",
        ],
        errors,
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.render("login", {
        styles: [
          "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
          "https://fonts.googleapis.com/icon?family=Material+Icons",
          "/css/styles.css",
          "/css/login.css",
        ],
        errors,
      });
    }

    req.session.user = {
      timestamp: Date.now(),
      id: user.id,
      firstName: user.firstName,
      email: user.email,
    };
    if (req.body.remember) {
      res.cookie("email", req.body.email, { maxAge: 1000 * 60 * 60 });
    }
    res.cookie("email", req.body.email);
    return res.redirect("/user/profile");
  },
  profile(req, res) {
    const { user } = req.session;
    return res.render("profile", {
      styles: [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "/css/normalize.css",
        "/css/styles.css",
        "/css/home.css",
      ],
      user,
    });
  },
  logout(req, res) {
    res.clearCookie("email");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = controller;

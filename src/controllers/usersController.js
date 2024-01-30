const db = require("../database/models");

const { validationResult } = require("express-validator");

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
  registerProcess: async (req, res) => {
    try {
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
      const rol = await db.Rol.findOne({ where: { name: "Usuario" } });
      const newUser = {
        ...req.body,
        avatar: req.file ? req.file.filename : "default.png",
        roles_id: rol.id,
      };
      const userCreated = await db.User.create(newUser);
      await db.Cart.create({ users_id: userCreated.id, status_id: 1 });
      return res.redirect("/user/login");
    } catch (error) {
      return res.status(500).send(error);
    }
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
  async loginProcess(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("login", {
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

      const user = await db.User.findOne({ where: { email: req.body.email } });
      req.session._id = user.id;
      req.session.avatar = user.avatar;
      if (req.body.remember) {
        res.cookie("email", user.email);
      }
      const rol = await db.Rol.findByPk(user.roles_id);
      if (rol.name == "Administrador") req.session.isAdmin = true;
      return res.redirect("/user/profile");
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async profile(req, res) {
    try {
      const user = await db.User.findByPk(req.session._id);
      return res.render("profile", {
        styles: [
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
          "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
          "/css/normalize.css",
          "/css/styles.css",
          "/css/profile.css",
        ],
        user: { ...user.dataValues },
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async profileData(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("profile.ejs", {
          styles: [
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
            "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
            "/css/normalize.css",
            "/css/styles.css",
            "/css/profile.css",
          ],
          errors: errors.mapped(),
          user: req.body,
        });
      }
      await db.User.update(
        {
          ...req.body,
        },
        {
          where: { id: req.session._id },
        }
      );
      return res.redirect("/user/profile");
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  logout(req, res) {
    req.session.destroy();
    return res.redirect("/user/login");
  },
};

module.exports = controller;

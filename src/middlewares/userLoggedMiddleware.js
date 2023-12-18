const db = require("../database/models");

async function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  let emailInCookie = req.cookies.email;
  const users = await db.User.findAll();
  const user =
    (await users.find((u) => u.email === emailInCookie)) ||
    (await users.find((u) => u.email === req.session.user.dataValues.email));
  if (user) {
    req.session.user = user;
  }
  if (req.session.user) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.user;
  }
  if (req.session._id) res.locals.isLogged = true;
  if (req.session.avatar) res.locals.avatar = req.session.avatar;
  if (req.session.isAdmin) res.locals.isAdmin = true;
  next();
}

module.exports = userLoggedMiddleware;

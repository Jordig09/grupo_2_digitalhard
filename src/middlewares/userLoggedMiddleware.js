const db = require("../database/models");

async function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  if (req.session._id) res.locals.isLogged = true;
  if (req.session.avatar) res.locals.avatar = req.session.avatar;
  if (req.session.isAdmin) res.locals.isAdmin = true;
  next();
}

module.exports = userLoggedMiddleware;

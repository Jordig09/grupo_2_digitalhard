function isLoggedMiddleware(req, res, next) {
  if (req.session._id) return res.redirect("/");
  next();
}

function isNotLoggedMiddleware(req, res, next) {
  if (!req.session._id) return res.redirect("/user/login");
  next();
}

module.exports = { isLoggedMiddleware, isNotLoggedMiddleware };

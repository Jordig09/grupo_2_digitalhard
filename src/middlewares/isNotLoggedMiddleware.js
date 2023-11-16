function isLoggedMiddleware(req, res, next) {
  if (!req.session.user) {
    return res.redirect("login");
  }
  next();
}

module.exports = isLoggedMiddleware;

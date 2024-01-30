const checkIsAdmin = (req, res, next) => {
  if (!req.session.isAdmin) return res.status(401).render("notAuthorized");
  next();
};

module.exports = { checkIsAdmin };

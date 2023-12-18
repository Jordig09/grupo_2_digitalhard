function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  // let emailInCookie = req.cookies.email;
  // const users = getUsers();
  // const userFromCookie = users.find((u) => u.email === emailInCookie);
  // if (userFromCookie) {
  //   req.session.user = userFromCookie;
  // }
  if (req.session._id) res.locals.isLogged = true;
  if (req.session.avatar) res.locals.avatar = req.session.avatar;
  if (req.session.isAdmin) res.locals.isAdmin = true;
  next();
}

module.exports = userLoggedMiddleware;

const fs = require("fs");
const path = require("path");

const usersDataFilePath = path.join(__dirname, "../data/users.json");
function getUsers() {
  return JSON.parse(fs.readFileSync(usersDataFilePath, "utf-8"));
}

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  let emailInCookie = req.cookies.email;
  const users = getUsers();
  const userFromCookie = users.find((u) => u.email === emailInCookie);

  if (userFromCookie) {
    req.session.user = userFromCookie;
  }
  if (req.session.user) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.user;
  }

  next();
}

module.exports = userLoggedMiddleware;

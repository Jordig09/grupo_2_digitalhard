const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const searchRouter = require("./routes/searchCategories");
// const buildRoute = require("./routes/buildRoute");
// const cartRoute = require("./routes/cartRoute");
const helpRoute = require("./routes/helpRoute");

const app = express();

const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

app.use(
  session({
    secret: "Shhh, It's a secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser());

app.use(userLoggedMiddleware);

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.use("/", mainRouter);
app.use("/products", productsRouter);
app.use("/categories", productsRouter);
// app.use("/build", buildRoute);
// app.use("/cart", cartRoute);
app.use("/help", helpRoute);
app.use("/user", usersRouter);
app.use("/search", searchRouter);

app.get("*", (req, res) => {
  res.render("404");
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  err ? console.log(err) : console.log(`Servidor escuchando puerto ${port}`);
});

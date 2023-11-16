const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const app = express();

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/usersRoutes")
const buildRoute = require("./routes/buildRoute");
const cartRoute = require("./routes/cartRoute");
const helpRoute = require("./routes/helpRoute");
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");

app.use("/", mainRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.use("/build", buildRoute);
app.use("/cart", cartRoute);
app.use("/help", helpRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get("*", (req, res) => {
  res.render("404");
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  err ? console.log(err) : console.log(`Servidor escuchando puerto ${port}`);
});

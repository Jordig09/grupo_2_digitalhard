const express = require("express");
const path = require("path");

const productRoute = require("./routes/productsRoute");
const buildRoute = require("./routes/buildRoute");
const cartRoute = require("./routes/cartRoute");
const helpRoute = require("./routes/helpRoute");
const loginRoute = require("./routes/loginRoute");
const mainRoute = require("./routes/mainRoute");
const registerRoute = require("./routes/registerRoute");

const app = express();

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use("/", mainRoute);
app.use("/products", productRoute);
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

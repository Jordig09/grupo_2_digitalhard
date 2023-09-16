const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/product-list", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/productList.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/register.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/cart.html"));
});

app.get("/product", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/productDetail.html"));
});

app.get("/build", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/build.html"));
});

app.get("/help", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/help.html"));
});

app.listen(port, (err) => {
  err ? console.log(err) : console.log(`Servidor escuchando puerto ${port}`);
});

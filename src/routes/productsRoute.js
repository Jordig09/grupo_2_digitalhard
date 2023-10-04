const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsController");

router.get("/", controller.index);

router.get("/:id", controller.getProduct);

module.exports = router;

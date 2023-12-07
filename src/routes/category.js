const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoryController.js");

router.get("/", controller.getSubcategories);

module.exports = router;

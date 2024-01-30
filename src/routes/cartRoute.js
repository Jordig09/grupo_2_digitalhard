const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");

const { isNotLoggedMiddleware } = require("../middlewares/isLoggedMiddleware");

router.get("/", isNotLoggedMiddleware, controller.index);
router.post("/", isNotLoggedMiddleware, controller.addProduct)
router.delete("/:products_id", controller.deleteProduct)
router.post("/checkout", controller.checkout)

module.exports = router;

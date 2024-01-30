const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");

const { isNotLoggedMiddleware } = require("../middlewares/isLoggedMiddleware");

router.get("/", isNotLoggedMiddleware, controller.index);
router.post("/", isNotLoggedMiddleware, controller.addProduct);
router.delete("/:products_id", isNotLoggedMiddleware, controller.deleteProduct);
router.post("/checkout", isNotLoggedMiddleware, controller.checkout);

module.exports = router;

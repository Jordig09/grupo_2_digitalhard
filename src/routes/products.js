const express = require("express");
const multer = require("multer");
const path = require("path");

const productsController = require("../controllers/productsController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/products"));
  },
  filename: (req, file, cb) => {
    const newFileName = `img-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

router.get("/", productsController.index);

router.get("/create", productsController.create);
router.post("/", upload.array("images"), productsController.store);

router.get("/:id", productsController.detail);

router.get("/:id/edit", productsController.edit);
router.put("/:id", upload.array("images"), productsController.update);

router.delete("/:id", productsController.destroy);

module.exports = router;

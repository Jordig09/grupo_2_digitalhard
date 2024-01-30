const express = require("express");
const multer = require("multer");
const path = require("path");

const productsController = require("../controllers/productsController");

const { isNotLoggedMiddleware } = require("../middlewares/isLoggedMiddleware");
const { checkIsAdmin } = require("../middlewares/auth");
const { getSpecification } = require("../middlewares/getSpecifications");
const { productValidation } = require("../middlewares/productValidations");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/products"));
  },
  filename: (req, file, cb) => {
    const newFileName = `img-${Date.now()}-${
      Math.floor(Math.random() * 90000) + 10000
    }${path.extname(file.originalname)}`;
    cb(null, newFileName);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFiles = ["jpg", "jpeg", "png", "webp"];
  const fileExt = file.originalname.split(".").pop().toLowerCase();
  if (allowedFiles.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error("Extensión no permitida."), false);
  }
};

const upload = multer({ storage, fileFilter });

router.get("/", productsController.index);

router.get(
  "/create",
  isNotLoggedMiddleware,
  checkIsAdmin,
  productsController.create
);

router.post(
  "/create",
  upload.any(),
  getSpecification,
  productValidation,
  productsController.store
);
router.get("/:id", productsController.detail);

router.get(
  "/:id/edit",
  isNotLoggedMiddleware,
  checkIsAdmin,
  productsController.edit
);
router.put(
  "/:id",
  upload.any(),
  getSpecification,
  productValidation,
  productsController.update
);

router.delete("/:id", productsController.destroy);

module.exports = router;

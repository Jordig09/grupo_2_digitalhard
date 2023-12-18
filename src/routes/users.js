const express = require("express");
const multer = require("multer");
const path = require("path");

const controller = require("../controllers/usersController");

const {
  createUserValidation,
  validateUserLogin,
  profileValidation,
} = require("../middlewares/userValidations");
const {
  isLoggedMiddleware,
  isNotLoggedMiddleware,
} = require("../middlewares/isLoggedMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/users"));
  },
  filename: (req, file, cb) => {
    const newFileName = `avatar-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get("/register", isLoggedMiddleware, controller.register);
router.post(
  "/register",
  upload.single("avatar"),
  createUserValidation,
  controller.registerProcess
);
router.get("/login", isLoggedMiddleware, controller.login);
router.post("/login", validateUserLogin, controller.loginProcess);
router.get("/profile", isNotLoggedMiddleware, controller.profile);
router.post("/profile/data", profileValidation, controller.profileData);
router.get("/logout", controller.logout);

module.exports = router;

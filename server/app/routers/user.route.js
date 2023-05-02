const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");
const ValidationMiddleware = require("../middlewares/auth.validation.middleware");
const PermissionMiddleware = require("../middlewares/permission.middleware");

router.post("/register", [UsersController.insert]);

router.get("/profile/:username", [
  UsersController.findUserByUsername,
]);



router.post("/update-avatar", [UsersController.changeAvt]);
router.post("/update-name", [UsersController.changeName]);
router.post("/update-email", [UsersController.changeEmail]);

module.exports = router;

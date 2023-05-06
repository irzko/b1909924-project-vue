const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/user.controller");

router.post("/register", [UsersController.insert]);

router.get("/profile/:username", [
  UsersController.findUserByUsername,
]);

module.exports = router;

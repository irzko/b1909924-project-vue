const router = require("express").Router();
const UsersController = require("../controllers/user.controller");

router.get("/:keyword", [UsersController.findUserByName]);

module.exports = router;

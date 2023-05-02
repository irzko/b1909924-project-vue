const router = require("express").Router();
const UsersController = require("../controllers/users.controller");

router.get("/:keyword", [UsersController.findUserByName]);

module.exports = router;

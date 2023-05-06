const express = require("express");
const router = express.Router();

router.use("/users", require("./user.route"));
router.use("/auth", require("./auth.route"));
router.use("/post", require("./post.route"));
router.use("/image", require("./image.route"));
router.use("/search", require("./search.route"));

module.exports = router;

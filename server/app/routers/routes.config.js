const express = require("express");
const router = express.Router();

router.use("/users", require("./user.route"));
router.use("/auth", require("./auth.route"));
router.use("/post", require("./post.route"));
router.use("/image", require("./image.config"));
router.use("/test", require("./test.route"));
// router.use("/upload", require("./upload.config"));
// router.use("/search", require("./search.route"));

module.exports = router;

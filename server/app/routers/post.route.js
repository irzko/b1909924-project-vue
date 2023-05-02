const express = require("express");
const router = express.Router();

const PostController = require("../controllers/post.controller");

router.post("/", [PostController.insert]);
router.get("/", [PostController.getAll]);
router.post("/update", [PostController.updatePost]);
router.delete("/:postId", [PostController.deletePost]);
router.get("/:IdPost", [PostController.getPostByUserId]);

router.post("/like", [PostController.like]);
router.post("/unlike", [PostController.unlike]);
router.post("/comment", [PostController.comment]);
module.exports = router;

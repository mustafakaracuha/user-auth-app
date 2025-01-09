const express = require("express");
const { createPost, getPosts, getTotalPosts } = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/posts", protect, createPost);
router.get("/posts", getPosts);
router.get("/posts/count", getTotalPosts);
router.post("/posts/:id/like", protect, likePost);
router.post("/posts/:id/unlike", protect, unlikePost);


module.exports = router;

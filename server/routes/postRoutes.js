const express = require("express");
const { createPost, getPosts } = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/posts", protect, createPost);
router.get("/posts", getPosts);

module.exports = router;

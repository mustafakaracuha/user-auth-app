const express = require("express");
const { createPost, getPosts } = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);

module.exports = router;

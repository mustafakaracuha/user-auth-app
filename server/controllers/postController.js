const Post = require("../models/Post");

const createPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.user._id;

    try {
        const post = new Post({ user: userId, content });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Post oluşturulamadı", error });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "username");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Postlar getirilemedi", error });
    }
};

module.exports = { createPost, getPosts };

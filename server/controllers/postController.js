const Post = require("../models/Post");

const createPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.user._id;
    const username = req.user.username;
    const name = req.user.name;

    try {
        const post = new Post({ user: userId, username, name, content });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Post oluşturulamadı", error });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "username name").sort({ createdAt: -1 });
        res.setHeader("Cache-Control", "no-cache");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Postlar getirilemedi", error });
    }
};


const getTotalPosts = async (req, res) => {
    try {
        const totalPosts = await Post.countDocuments();
        res.status(200).json({ totalPosts });
    } catch (error) {
        res.status(500).json({ message: "Toplam post sayısı getirilemedi", error });
    }
};



module.exports = { createPost, getPosts, getTotalPosts };
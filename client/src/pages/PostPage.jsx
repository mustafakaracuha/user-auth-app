import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "boring-avatars";
import {jwtDecode} from "jwt-decode";
import moment from "moment";
import { motion } from "framer-motion";
import { CgSpinner } from "react-icons/cg";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const PostsPage = () => {
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingSubmitPost, setLoadingSubmitPost] = useState(false);

    useEffect(() => {
        fetchPosts();
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
        }
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/posts`);
            setPosts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        setLoadingSubmitPost(true);
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/posts`,
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLoadingSubmitPost(false);
            fetchPosts();
            setContent("");
        } catch (error) {
            console.error("Error creating post:", error);
            setLoadingSubmitPost(false);
        }
    };

    const handleLike = async (postId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/posts/${postId}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchPosts();
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleUnlike = async (postId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/posts/${postId}/unlike`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchPosts();
        } catch (error) {
            console.error("Error unliking post:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen max-sm:bg-white bg-gray-100">
            <div
                className={
                    posts.length === 0
                        ? "w-full transition-all h-[25rem] max-w-xl p-8 space-y-8 bg-white rounded-lg max-sm:shadow-none shadow-lg"
                        : "w-full transition-all h-[40rem] max-w-xl p-8 space-y-8 bg-white rounded-lg max-sm:shadow-none shadow-lg"
                }
            >
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Posts</h1>
                    <Link to="/profile" className="text-md font-bold">
                        {user && <Avatar size={40} name={user.username} variant="beam" colors={["#5b1d99", "#0074b4", "#00b34c", "#ffd41f", "#fc6e3d"]} />}
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <textarea
                            className="w-full h-24 p-2 border border-gray-300 rounded-lg outline-none focus:border-indigo-500"
                            placeholder="What do you think?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={!content}
                            className="self-end flex gap-2 items-center max-sm:w-full mt-2 disabled:opacity-50 rounded-lg bg-gradient-to-r from-[#0074b4] to-[#00b34c] text-white transition-all py-2 px-4 active:scale-105"
                        >
                            Send
                            {loadingSubmitPost && <CgSpinner size={18} className="animate-spin text-white" />}
                        </button>
                    </div>
                </form>
                <div className="mt-8 h-[20rem] overflow-y-auto">
                    {loading && (
                        <div className={posts.length === 0 ? "w-full flex items-start justify-center" : "w-full h-full flex items-center justify-center"}>
                            <CgSpinner size={30} className="animate-spin text-indigo-600" />
                        </div>
                    )}
                    {!loading && Array.isArray(posts) && posts.length === 0 ? (
                        <div className="w-full h-full flex items-start justify-center">
                            <p className="text-md text-gray-400">Share your post</p>
                        </div>
                    ) : (
                        posts.map((post, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                key={post._id}
                                className="mb-4 p-4 border border-gray-300 flex items-start space-x-4 rounded-lg"
                            >
                                <Avatar size={40} name={post.username} variant="beam" colors={["#5b1d99", "#0074b4", "#00b34c", "#ffd41f", "#fc6e3d"]} />
                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <p className="text-gray-500 font-semibold text-md">{post.user.name}</p>
                                            <p className="text-gray-300 font-semibold text-sm max-sm:hidden">@{post.user.username}</p>
                                        </div>
                                        <p className="text-gray-400 text-sm">{moment(post.createdAt).fromNow()}</p>
                                    </div>
                                    <p className="text-gray-700 mt-3">{post.content}</p>
                                    <div className="flex items-center mt-3">
                                    {post.likes?.includes(user?.id) ? (
                                            <FaHeart size={18} className="text-red-500 cursor-pointer" onClick={() => handleUnlike(post._id)} />
                                        ) : (
                                            <FaRegHeart size={18} className="text-gray-500 cursor-pointer" onClick={() => handleLike(post._id)} />
                                        )}
                                        <span className="ml-2 text-gray-500">{post.likes.length > 0 && post.likes.length}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostsPage;

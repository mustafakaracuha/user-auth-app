import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "boring-avatars";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";

const PostsPage = () => {
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchPosts();
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
        }
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("/api/posts");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "/api/posts",
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchPosts();
            setContent("");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg h-[40rem] p-8 space-y-8 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Posts</h1>
                    <Link to="/profile" className="text-md font-bold">
                        {user && <Avatar size={40} name={user.username} variant="beam" colors={["#ff5252"]} />}
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <textarea
                            className="w-full h-24 p-2 border border-gray-300 rounded outline-none focus:border-indigo-500"
                            placeholder="Neler düşündüğünüzü buraya yazın..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" disabled={!content} className="self-end disabled:opacity-50 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
                        Paylaş
                    </button>
                </form>
                <div className="mt-8 h-[20rem] overflow-y-auto">
                    {posts.length === 0 ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <CgSpinner size={30} className="text-indigo-600 animate-spin" />
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className="mb-4 p-4 border border-gray-300 rounded-md flex items-start space-x-4">
                                <Avatar
                                    size={40}
                                    name={post.username}
                                    variant="beam"
                                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90", "#E0E4CC", "#69D2E7", "#FA6900", "#F38630", "#E94C6F"]}
                                />
                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-500 font-semibold text-md">
                                            {post.user.name} {post.user.username}
                                        </p>
                                        <p className="text-gray-300 text-sm">{post.createdAt}</p>
                                    </div>
                                    <p className="text-gray-700 mt-3">{post.content}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostsPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "boring-avatars";
import { jwtDecode } from "jwt-decode";

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
            setPosts([response.data, ...posts]);
            setContent("");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold">İlk Paylaşımını Yap</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        {user && <Avatar size={60} name={user.username} variant="beam" colors={["#5b1d99", "#0074b4", "#00b34c", "#ffd41f", "#fc6e3d"]} />}
                        <textarea
                            className="w-full h-14 p-2 border border-gray-300 rounded"
                            placeholder="Yazınızı buraya yazın..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="self-end bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Paylaş
                    </button>
                </form>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Paylaşımlar</h2>
                    {posts.length === 0 ? (
                        <p className="text-gray-500">İlk yazınızı paylaşın!</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className="mb-4 p-4 border border-gray-300 rounded flex items-start space-x-4">
                                <Avatar size={40} name={post.user.username} variant="beam" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                                <div>
                                    <p className="text-gray-700">{post.content}</p>
                                    <p className="text-gray-500 text-sm">- {post.user.username}</p>
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

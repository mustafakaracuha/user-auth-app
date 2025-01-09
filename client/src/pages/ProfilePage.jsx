import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaSpinner } from "react-icons/fa";
import Avatar from "boring-avatars";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [totalPosts, setTotalPosts] = useState("");
    const [totalUsers, setTotalUsers] = useState("");
    const [totalTimeSpent, setTotalTimeSpent] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTotalCounts();
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken);
            } catch (error) {
                console.error("Invalid token:", error);
                navigate("/"); // Token geçersizse login sayfasına yönlendir
            }
        } else {
            navigate("/"); // Token yoksa login sayfasına yönlendir
        }
    }, [navigate]);

    const fetchTotalCounts = async () => {
        setLoading(true);
        try {
            const postResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/posts/count`);
            setTotalPosts(postResponse.data.totalPosts);

            const userResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/user-count`);
            setTotalUsers(userResponse.data.userCount);

            setLoading(false);
        } catch (error) {
            console.error("Error fetching counts:", error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    if (!user) {
        return (
            <div className="w-full h-screen bg-white flex items-center justify-center">
                <FaSpinner size={30} className="text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative flex items-center justify-center min-h-screen max-sm:bg-white bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg max-sm:shadow-none shadow-lg shadow-gray-200">
                <div className="relative flex items-center rounded-t-lg bg-gradient-to-r from-[#FFF1DB]  to-[#D4BDAC] py-20 justify-center space-x-4">
                    <Avatar
                        size={90}
                        name={user.username}
                        className="absolute top-[7rem] bg-white rounded-full ring ring-white"
                        variant="beam"
                        colors={["#5b1d99", "#0074b4", "#00b34c", "#ffd41f", "#fc6e3d"]}
                    />
                </div>
                <div className="text-center !mt-14">
                    <h2 className="text-xl font-medium text-gray-900">{user.name}</h2>
                    <p className="text-md text-gray-400">@{user.username}</p>
                    <p className="text-md text-gray-700">{user.email}</p>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <Link
                        to="/posts"
                        className="w-1/2 flex items-center rounded-lg cursor-pointer justify-center font-medium text-md py-3 px-4 bg-gradient-to-r from-[#ffd41f] to-[#fc6e3d] text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fc6e3d]"
                    >
                        Posts
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-1/2 flex items-center rounded-lg cursor-pointer justify-center font-medium text-md py-3 px-4 bg-gradient-to-r from-[#0074b4] to-[#00b34c] text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Logout
                    </button>
                </div>
                {totalPosts && totalUsers && (
                    <div className="mt-8">
                        <h3 className="text-lg font-medium text-gray-900">Dashboard</h3>
                        <div className="w-full flex items-center mt-4 gap-4">
                            <div className="w-full flex flex-col items-center bg-gradient-to-r from-[#EBEAFF] to-[#9694FF] text-white p-4 rounded-lg">
                                <p className="text-md font-medium">My Posts</p>
                                <p className="text-2xl font-bold">{totalPosts}</p>
                            </div>
                            <div className="w-full flex flex-col items-center bg-gradient-to-r from-[#FF8A8A] to-[#F4DEB3] text-white p-4 rounded-lg">
                                <p className="text-md font-medium">My Favorites</p>
                                <p className="text-2xl font-bold">{totalUsers}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;

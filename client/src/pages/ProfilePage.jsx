import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import md5 from "md5";

import { jwtDecode } from "jwt-decode";
import { FaSpinner } from "react-icons/fa";
import Avatar from "boring-avatars";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-gray-900">Profile</h2>
                <div className="flex items-center space-x-4">
                <Avatar size={65} name={user.name} variant="beam" colors={["#5b1d99", "#0074b4", "#00b34c", "#F29F58", "#81BFDA", "#ffd41f", "#fc6e3d", "#FFEB00", "#EFB6C8", "#E82561","#997C70","#FF8383"]} />
                    <div className="text-left">
                        <h2 className="text-xl font-medium text-gray-900">{user.name}</h2>
                        <p className="text-md text-gray-400">@{user.username}</p>
                        <p className="text-sm text-gray-700">{user.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full mt-6 font-medium text-sm py-3 px-4 bg-gradient-to-r from-[#0074b4] to-[#00b34c] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;

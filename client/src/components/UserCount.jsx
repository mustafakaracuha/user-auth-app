import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers } from "react-icons/fa";

const UserCount = () => {
    const [userCount, setUserCount] = useState(0);
    const base_url = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/user-count`);
                setUserCount(data.userCount);
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        };

        fetchUserCount();
    }, []);

    return (
        <div className="text-center">
            <p className="text-sm font-medium text-gray-700 flex items-center justify-center gap-1">
                <FaUsers size={18} className="text-yellow-400" />
                Total Users: {userCount}
            </p>
        </div>
    );
};

export default UserCount;

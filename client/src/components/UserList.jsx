import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Avatar from "boring-avatars";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get("/api/auth/users");
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="relative h-[5rem] overflow-hidden">
            <motion.div className="absolute flex space-x-7" animate={{ x: ["0%", "-100%"] }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
                {[...users, ...users].map((user, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center justify-center flex-shrink-0 space-y-2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <Avatar size={56} name={user.name} variant="beam" colors={["#5b1d99", "#0074b4", "#00b34c", "#F29F58", "#81BFDA", "#ffd41f", "#fc6e3d", "#FFEB00", "#EFB6C8", "#E82561","#997C70","#FF8383"]} />
                        <p className="text-center text-[11px] font-medium text-gray-500">{user.name}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default UserList;

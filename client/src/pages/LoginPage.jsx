import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const base_url = import.meta.env.VITE_BASE_URL;

    const handleLogin = async (data) => {
        try {
            const response = await axios.post(`${base_url}/api/auth/login`, data);
            localStorage.setItem("token", response.data.token);
            setSuccess(response.data.message);
            setTimeout(() => {
                navigate("/profile");
            }, 1000);
        } catch (error) {
            setError(error.response?.data?.message || "Error logging in user");
        }
    };

    return <AuthForm isLogin={true} onSubmit={handleLogin} error={error} success={success} />;
};

export default LoginPage;

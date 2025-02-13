import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, data);
            localStorage.setItem("token", response.data.token);
            setSuccess(response.data.message);
            setTimeout(() => {
                setLoading(false);
                navigate("/posts");
            }, 1000);
        } catch (error) {
            setError(error.response?.data?.message || "Error logging in user");
            setLoading(false);
        }
    };

    return <AuthForm isLogin={true} onSubmit={handleLogin} error={error} success={success} loading={loading} />;
};

export default LoginPage;

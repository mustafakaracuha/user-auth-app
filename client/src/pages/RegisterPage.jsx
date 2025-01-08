import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, data);
            console.log("Register data:", response.data);
            setSuccess(response.data.message);
            setTimeout(() => {
                setLoading(false);
                navigate("/");
            }, 1000);
        } catch (error) {
            setError(error.response?.data?.message || "Error registering user");
            setLoading(false);
        }
    };

    return <AuthForm isLogin={false} onSubmit={handleRegister} error={error} success={success} loading={loading} />;
};

export default RegisterPage;

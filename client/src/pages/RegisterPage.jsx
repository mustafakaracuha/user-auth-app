import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const base_url = import.meta.env.VITE_BASE_URL;

    const handleRegister = async (data) => {
        try {
            const response = await axios.post(`${base_url}/api/auth/register`, data);
            console.log("Register data:", response.data);
            setSuccess(response.data.message);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            setError(error.response?.data?.message || "Error registering user");
        }
    };

    return <AuthForm isLogin={false} onSubmit={handleRegister} error={error} success={success} />;
};

export default RegisterPage;

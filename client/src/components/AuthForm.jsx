import React, { useState } from "react";
import { Link } from "react-router-dom";

import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import UserCount from "./UserCount";
import UserList from "./UserList";

import { CgSpinner } from "react-icons/cg";

const AuthForm = ({ isLogin, onSubmit, error, success, loading }) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLogin && password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        onSubmit({ name, username, email, password });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen max-sm:bg-white bg-gray-100">
            <div className="w-full max-w-md p-8 max-sm:p-0 space-y-8 bg-white rounded-lg max-sm:shadow-none shadow-lg shadow-gray-200">
                <h2 className="text-2xl font-bold text-center text-gray-900">{isLogin ? "Login" : "Register"}</h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        {!isLogin && (
                            <>
                                <FormInput id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" autoComplete="name" required />
                                <FormInput
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    autoComplete="username"
                                    required
                                />
                            </>
                        )}
                        <FormInput id="email-address" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="email" required />
                        <PasswordInput
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            showPassword={showPassword}
                            toggleShowPassword={toggleShowPassword}
                        />
                        {!isLogin && (
                            <PasswordInput
                                id="confirm-password"
                                name="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                showPassword={showPassword}
                                toggleShowPassword={toggleShowPassword}
                            />
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center py-3 px-4 bg-gradient-to-r from-[#0074b4] to-[#00b34c] text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                             {!loading && (isLogin ? "Login" : "Register")}
                            {loading && (<div className="w-full h-full flex items-center justify-center"><CgSpinner size={22} className="animate-spin" /></div>)}
                        </button>
                    </div>
                    {error && <div className="text-red-500 bg-red-50 py-2 rounded-md text-sm text-center">{error}</div>}
                    {success && <div className="text-green-500 bg-green-50 py-2 px-2 rounded-md text-sm text-center">{success}</div>}
                    {isLogin ? (
                        <div className="text-center">
                            <span className="text-gray-700">Don't have an account? </span>
                            <Link to="/register" className="font-medium hover:text-green-700 cursor-pointer text-gray-800">
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center">
                            <span className="text-gray-700">Already have an account? </span>
                            <Link to="/"  className="font-medium hover:text-green-700 cursor-pointer text-gray-800">
                                Login
                            </Link>
                        </div>
                    )}
                </form>
                <UserCount />
                <hr />
                <UserList />
            </div>
        </div>
    );
};

export default AuthForm;

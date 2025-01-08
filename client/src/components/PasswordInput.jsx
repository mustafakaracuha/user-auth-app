import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ id, name, value, onChange, placeholder, showPassword, toggleShowPassword }) => {
    return (
        <div className="relative">
            <label htmlFor={id} className="sr-only">
                {placeholder}
            </label>
            <input
                id={id}
                name={name}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={value}
                onChange={onChange}
                className="relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={placeholder}
            />
            <button type="button" onClick={toggleShowPassword} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600">
                {showPassword ? <FaEyeSlash className="text-gray-400"/> : <FaEye className="text-gray-400"/>}
            </button>
        </div>
    );
};

export default PasswordInput;

import React from "react";

const FormInput = ({ id, name, type, value, onChange, placeholder, autoComplete, required }) => {
    return (
        <div>
            <label htmlFor={id} className="sr-only">
                {placeholder}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                required={required}
                value={value}
                onChange={onChange}
                className="relative block max-sm:rounded-none w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={placeholder}
            />
        </div>
    );
};

export default FormInput;

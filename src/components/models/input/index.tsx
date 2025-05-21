import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, className = "", type = "text", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark mb-1">
          {label}
        </label>
      )}
      <input
        type={isPassword && showPassword ? "text" : type}
        className={`
            w-full px-4 py-2 border rounded-md 
            shadow-sm border-slate-100
            focus:outline-none 
            focus:ring-1 
            focus:ring-slate-200 
            focus:border-slate-200 
            ${className}`}
        {...props}
      />

      {type === "password" && (
        <div className="flex gap-2 items-center mt-2">
          <input type="checkbox" className="cursor-pointer" onChange={(e) => setShowPassword(e.target.checked)} id={`showPasswordToggle${randomId}`} />
          <label htmlFor={`showPasswordToggle${randomId}`} className="text-md text-gray-500 cursor-pointer">
            Mostrar senha
          </label>
        </div>
      )}
    </div>
  );
};

export default Input;

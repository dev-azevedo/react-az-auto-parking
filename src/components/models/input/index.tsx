import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
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
    </div>
  );
};

export default Input;

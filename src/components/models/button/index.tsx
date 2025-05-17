import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
};

export default function Button(props: ButtonProps) {
  const {
    children,
    onClick,
    type = 'button',
    className = '',
    disabled = false,
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-md 
        transition duration-300 
        shadow-md 
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed 
        hover:opacity-70
        ${className}
      `}
    >
      {children}
    </button>
  );
}

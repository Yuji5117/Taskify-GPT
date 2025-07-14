import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
}

const Button = ({
  children,
  size = "md",
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md cursor-pointer";

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

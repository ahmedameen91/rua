import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus-ring cursor-pointer select-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 hover:from-rose-600 hover:to-rose-700 active:scale-[0.98]",
    secondary:
      "bg-transparent border-2 border-rose-300 text-rose-600 hover:bg-rose-50 hover:border-rose-400 active:scale-[0.98] dark:border-rose-400/30 dark:text-rose-300 dark:hover:bg-rose-900/20",
    ghost:
      "bg-transparent text-rose-600 hover:bg-rose-50 active:scale-[0.98] dark:text-rose-300 dark:hover:bg-rose-900/20",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled || isLoading ? "opacity-60 pointer-events-none" : ""
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

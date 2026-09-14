import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = "",
  hover = true,
  onClick,
}: CardProps) {
  return (
    <div
      className={`glass rounded-2xl p-6 transition-all duration-300
        ${hover ? "hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1 hover:border-rose-300/40" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

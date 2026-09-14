import React from "react";
import { Heart } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizes = {
    sm: { icon: 16, text: "text-lg" },
    md: { icon: 20, text: "text-xl" },
    lg: { icon: 28, text: "text-3xl" },
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Heart
          size={sizes[size].icon}
          className="text-rose-500 fill-rose-500 animate-pulse-soft"
        />
        <div className="absolute inset-0 blur-md bg-rose-400/30 rounded-full" />
      </div>
      {showText && (
        <span
          className={`font-semibold tracking-tight ${sizes[size].text} gradient-text`}
        >
          Couple Space
        </span>
      )}
    </div>
  );
}

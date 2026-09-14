import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({
  label,
  error,
  icon,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-warm-800 dark:text-warm-200"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400/60">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full rounded-xl px-4 py-3 text-base transition-all duration-200
            bg-[var(--input-bg)] border border-[var(--input-border)]
            text-[var(--foreground)] placeholder:text-[var(--muted)]
            focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-400
            hover:border-rose-300
            ${icon ? "pl-10" : ""}
            ${error ? "border-red-400 focus:ring-red-400/50" : ""}
            ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 animate-slide-up">{error}</p>
      )}
    </div>
  );
}

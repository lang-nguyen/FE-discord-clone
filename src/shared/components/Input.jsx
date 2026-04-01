import React from 'react';
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const Input = React.forwardRef(({ className, type, label, error, required, ...props }, ref) => {
    const inputId = React.useId();

    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-xs font-bold uppercase tracking-wide text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                id={inputId}
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-[3px] bg-[#1E1F22] px-3 py-2 text-base text-gray-100 placeholder:text-gray-500 outline-none border-none focus:ring-0 transition-colors",
                    "focus:bg-[rgba(0,0,0,0.1)] focus:outline-none focus-visible:outline-none",
                    error && "border border-red-500",
                    className
                )}
                ref={ref}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-500 font-medium">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";

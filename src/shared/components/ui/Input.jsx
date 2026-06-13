import * as React from "react"
import { cn } from "@/shared/lib/utils"

const Input = React.forwardRef(({ className, type, error, label, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className={cn(
          "text-xs font-bold uppercase tracking-wide",
          error ? "text-red-500" : "text-muted-text"
        )}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-transparent bg-input-bg px-3 py-2 text-sm text-primary-text transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-text focus-visible:outline-none focus-visible:border-[#5865f2] disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none",
          error && "border border-red-500 focus-visible:border-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 italic mt-1">{error}</span>
      )}
    </div>
  )
})
Input.displayName = "Input"

export { Input }

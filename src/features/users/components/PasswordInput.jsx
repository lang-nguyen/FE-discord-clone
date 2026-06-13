import { Eye, EyeOff } from "lucide-react";

export function PasswordInput({ label, visible, onToggle, ...props }) {
  const Icon = visible ? EyeOff : Eye;

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-xs font-bold uppercase tracking-wide text-muted-text">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={visible ? "text" : "password"}
          className="flex h-10 w-full rounded-md border border-transparent bg-input-bg px-3 py-2 pr-11 text-sm text-primary-text transition-colors placeholder:text-muted-text focus-visible:border-[#5865f2] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-md text-muted-text transition-colors hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5865f2]"
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
        >
          <Icon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

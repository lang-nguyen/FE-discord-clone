import { PrivateProfileCard } from "./PrivateProfileCard";

export const ServerPrivacyToggle = ({ isPrivate, onChange }) => {
  return (
    <div className="mb-8">
      <div className="flex items-start gap-6">
        {/* Left info + toggle */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 id="privacy-toggle-label" className="text-sm font-semibold text-primary-text">
              Private Profile
            </h3>
            {/* Toggle */}
            <button
              role="switch"
              aria-checked={isPrivate}
              aria-labelledby="privacy-toggle-label"
              onClick={() => onChange(!isPrivate)}
              className={`relative w-10 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5865f2] ${
                isPrivate ? "bg-[#5865f2]" : "bg-muted-text/40"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  isPrivate ? "left-[18px]" : "left-0.5"
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-muted-text leading-relaxed max-w-[260px]">
            When enabled, only server members can view profile content.
            Non-members won&apos;t be able to see this content unless they have
            an invite.
          </p>
        </div>

        {/* Private preview card */}
        <PrivateProfileCard />
      </div>
    </div>
  );
};

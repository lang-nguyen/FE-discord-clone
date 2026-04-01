import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/Avatar";
import { BANNER_COLORS } from "./forms/ServerBannerSelector";

export const ServerPreviewCard = ({ data, onOpenIconPicker }) => {
  const {
    serverName,
    selectedBanner,
    description,
    avatarUrl,
    onlineCount = 0,
    membersCount = 0,
    establishedDate = "",
  } = data;

  const allGradients = BANNER_COLORS.flat();
  const bannerStyle = allGradients[selectedBanner] || allGradients[0];

  return (
    <div className="hidden lg:block">
      <div className="fixed top-5">
        <div className="w-[300px] rounded-lg overflow-hidden bg-[#232428] border border-[#3b3d44]/50 shadow-xl">

          {/* Banner */}
          <div
            className="h-[105px]"
            style={{ background: bannerStyle }}
          />

          {/* Avatar */}
          <div className="relative px-4">
            <div 
              className="absolute -top-6 cursor-pointer group"
              onClick={onOpenIconPicker}
            >
              <Avatar className="w-[52px] h-[52px] rounded-2xl border-[4px] border-[#232428] transition-opacity">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={serverName} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-2xl text-lg bg-[#5865f2] text-white font-medium">
                    {serverName?.trim()?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                )}
              </Avatar>

              {/* Hover Edit Overlay */}
              <div 
                className="absolute inset-[4px] rounded-[12px] bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3l1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="px-4 pt-9 pb-4">
            <h3 className="text-base font-semibold text-white truncate">
              {serverName || "Server Name"}
            </h3>

            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {onlineCount} Online
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-500" />
                {membersCount} Members
              </span>
            </div>

            {establishedDate && (
              <p className="text-xs text-gray-500 mt-1.5">
                Est. {establishedDate}
              </p>
            )}

            {description && (
              <p className="text-sm text-gray-400 mt-3 whitespace-pre-wrap break-words">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
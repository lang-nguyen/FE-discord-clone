import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/Avatar";
import { BANNER_COLORS } from "./forms/ServerBannerSelector";

export const ServerPreviewCard = ({ data }) => {
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
            <div className="absolute -top-6">
              <Avatar className="w-[52px] h-[52px] rounded-2xl border-[4px] border-[#232428]">
                {avatarUrl && <AvatarImage src={avatarUrl} alt={serverName} />}
                <AvatarFallback className="rounded-2xl text-lg">
                  {serverName?.charAt(0)?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
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
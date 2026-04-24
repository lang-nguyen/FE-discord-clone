import { Avatar, AvatarFallback } from "@/shared/components/ui/Avatar";

export const PrivateProfileCard = () => {
  return (
    <div className="w-[240px] rounded-lg overflow-hidden bg-[#232428] border border-[#3b3d44]/50">
      {/* Banner placeholder */}
      <div className="h-[70px] bg-[#555555]" />

      {/* Avatar */}
      <div className="relative px-3">
        <div className="absolute -top-5">
          <Avatar className="w-10 h-10 rounded-xl border-[3px] border-[#232428]">
            <AvatarFallback className="rounded-xl bg-[#3b3d44] text-gray-400 text-base">
              ?
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Info */}
      <div className="px-3 pt-7 pb-3">
        <h4 className="text-sm font-semibold text-gray-300">Private Server</h4>
        <p className="text-xs text-gray-500 mt-0.5">
          The server has limited who can see this profile.
        </p>
      </div>
    </div>
  );
};

import { Avatar, AvatarFallback } from "@/shared/components/ui/Avatar";

export const PrivateProfileCard = () => {
  return (
    <div className="w-[240px] rounded-lg overflow-hidden bg-user-panel-bg border border-black/20">
      {/* Banner placeholder */}
      <div className="h-[70px] bg-hover-bg" />

      {/* Avatar */}
      <div className="relative px-3">
        <div className="absolute -top-5">
          <Avatar className="w-10 h-10 rounded-xl border-[3px] border-user-panel-bg">
            <AvatarFallback className="rounded-xl bg-hover-bg text-muted-text text-base">
              ?
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Info */}
      <div className="px-3 pt-7 pb-3">
        <h4 className="text-sm font-semibold text-primary-text">Private Server</h4>
        <p className="text-xs text-muted-text mt-0.5">
          The server has limited who can see this profile.
        </p>
      </div>
    </div>
  );
};

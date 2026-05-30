import { X } from "lucide-react";
import { ProfileInfoBlock } from "@/features/users/components/ProfileInfoBlock";
import { UserAvatar } from "@/features/users/components/UserAvatar";
import { UserBanner } from "@/features/users/components/UserBanner";
import {
  getProfileBannerStyle,
  getUserDisplayName,
} from "@/features/users/composables/user-profile-display";

export function UserProfilePopover({ user, profile, onClose }) {
  const displayName = getUserDisplayName(user, profile);
  const bannerStyle = getProfileBannerStyle(profile);

  return (
    <div className="absolute bottom-[60px] left-2 z-40 w-[300px] overflow-hidden rounded-md bg-[#232428] text-white shadow-2xl">
      <button
        type="button"
        aria-label="Close profile"
        className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-md text-white/70 hover:bg-black/20 hover:text-white"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </button>

      <UserBanner className="h-20 bg-cover bg-center" style={bannerStyle} />
      <div className="px-4 pb-4">
        <div className="-mt-8 mb-3">
          <UserAvatar
            avatarUrl={profile?.avatarUrl}
            displayName={displayName}
            status="online"
            className="h-16 w-16 border-4 border-[#232428]"
          />
        </div>

        <div className="rounded-md bg-[#111214] p-3">
          <h2 className="truncate text-lg font-bold">{displayName}</h2>
          {user?.username && user.username !== displayName && (
            <p className="truncate text-sm text-gray-400">{user.username}</p>
          )}

          {profile?.bio && (
            <>
              <div className="my-3 h-px bg-white/10" />
              <ProfileInfoBlock title="About Me">{profile.bio}</ProfileInfoBlock>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

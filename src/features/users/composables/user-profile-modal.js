import { useEffect, useMemo, useState } from "react";
import { profileApi } from "@/features/users/api/profile.api";
import {
  formatMemberSince,
  getProfileBannerStyle,
  getUserDisplayName,
  getUsername,
} from "@/features/users/composables/user-profile-display";

export const TAB_ACTIVITY = "activity";
export const TAB_JOINED_SERVERS = "joinedServers";
export const TAB_OWNED_SERVERS = "ownedServers";

export function useUserProfileModal({ open, onOpenChange, user, profile }) {
  const [activeTab, setActiveTab] = useState(TAB_JOINED_SERVERS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [serverGroups, setServerGroups] = useState({ joined: [], owned: [] });
  const [serversLoading, setServersLoading] = useState(false);
  const [serversError, setServersError] = useState("");

  const displayName = getUserDisplayName(user, profile);
  const username = getUsername(user, displayName);
  const memberSince = formatMemberSince(profile?.createdAt);
  const bannerStyle = getProfileBannerStyle(profile, "#caa58f");

  const openSettings = () => {
    onOpenChange(false);
    setIsSettingsOpen(true);
  };

  useEffect(() => {
    if (!open) return;

    let isMounted = true;
    setServersLoading(true);
    setServersError("");

    profileApi
      .getUserServers()
      .then((data) => {
        if (!isMounted) return;
        setServerGroups({
          joined: Array.isArray(data?.joined) ? data.joined : [],
          owned: Array.isArray(data?.owned) ? data.owned : [],
        });
      })
      .catch(() => {
        if (!isMounted) return;
        setServersError("Could not load servers.");
      })
      .finally(() => {
        if (!isMounted) return;
        setServersLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [open]);

  const tabs = useMemo(
    () => [
      { id: TAB_ACTIVITY, label: "Activity" },
      { id: TAB_JOINED_SERVERS, label: `${serverGroups.joined.length} Server da tham gia` },
      { id: TAB_OWNED_SERVERS, label: `${serverGroups.owned.length} Server toi tao` },
    ],
    [serverGroups.joined.length, serverGroups.owned.length]
  );

  const visibleServers = activeTab === TAB_OWNED_SERVERS ? serverGroups.owned : serverGroups.joined;
  const emptyServerText = activeTab === TAB_OWNED_SERVERS ? "You have not created any servers yet." : "You have not joined any servers yet.";

  return {
    activeTab,
    bannerStyle,
    displayName,
    emptyServerText,
    isSettingsOpen,
    memberSince,
    openSettings,
    serversError,
    serversLoading,
    setActiveTab,
    setIsSettingsOpen,
    tabs,
    username,
    visibleServers,
  };
}

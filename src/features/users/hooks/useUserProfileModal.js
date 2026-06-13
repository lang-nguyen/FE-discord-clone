import { useEffect, useMemo, useState } from "react";
import { useGetServersQuery } from "@/features/servers/api/serversApi";
import {
  formatMemberSince,
  getProfileBannerStyle,
  getUserDisplayName,
  getUsername,
} from "@/features/users/hooks/userProfileDisplay";

export const TAB_ACTIVITY = "activity";
export const TAB_JOINED_SERVERS = "joinedServers";
export const TAB_OWNED_SERVERS = "ownedServers";

export function useUserProfileModal({ open, onOpenChange, user, profile }) {
  const [activeTab, setActiveTab] = useState(TAB_JOINED_SERVERS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const {
    data: servers = [],
    isLoading: serversLoading,
    error: serversQueryError,
  } = useGetServersQuery(undefined, { skip: !open });

  const displayName = getUserDisplayName(user, profile);
  const username = getUsername(user, displayName);
  const memberSince = formatMemberSince(profile?.createdAt);
  const bannerStyle = getProfileBannerStyle(profile, "#caa58f");

  const openSettings = () => {
    onOpenChange(false);
    setIsSettingsOpen(true);
  };

  useEffect(() => {
    if (!open) setActiveTab(TAB_JOINED_SERVERS);
  }, [open]);

  const serverGroups = useMemo(() => {
    const mapped = servers.map((server) => ({
      ...server,
      subtitle: server.description || "No description",
      color: server.bannerColor,
      imageUrl: server.iconId,
    }));
    return {
      joined: mapped.filter((server) => server.ownerId !== user?.id),
      owned: mapped.filter((server) => server.ownerId === user?.id),
    };
  }, [servers, user?.id]);

  const tabs = useMemo(
    () => [
      { id: TAB_ACTIVITY, label: "Activity" },
      { id: TAB_JOINED_SERVERS, label: `${serverGroups.joined.length} Server da tham gia` },
      { id: TAB_OWNED_SERVERS, label: `${serverGroups.owned.length} Server toi tao` },
    ],
    [serverGroups.joined.length, serverGroups.owned.length]
  );

  const visibleServers = activeTab === TAB_OWNED_SERVERS ? serverGroups.owned : serverGroups.joined;
  const emptyServerText =
    activeTab === TAB_OWNED_SERVERS
      ? "You have not created any servers yet."
      : "You have not joined any servers yet.";

  return {
    activeTab,
    bannerStyle,
    displayName,
    emptyServerText,
    isSettingsOpen,
    memberSince,
    openSettings,
    serversError: serversQueryError ? "Could not load servers." : "",
    serversLoading,
    setActiveTab,
    setIsSettingsOpen,
    tabs,
    username,
    visibleServers,
  };
}

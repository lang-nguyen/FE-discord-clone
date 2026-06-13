import { useEffect, useMemo, useState } from "react";
import { getSettingsRepository } from "@/features/server-settings/repositories/getRepository";
import { MOCK_FRIENDS } from "@/features/server-settings/invites/repositories/mockRepository";

export function useInvites(serverId = "default") {
  const repository = useMemo(() => getSettingsRepository("invites", serverId), [serverId]);
  const [invites, setInvites] = useState([]);
  const [isInvitesPaused, setIsInvitesPaused] = useState(false);
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [searchFriendQuery, setSearchFriendQuery] = useState("");

  useEffect(() => {
    repository.list().then(setInvites);
  }, [repository]);

  const friends = useMemo(() => {
    const query = searchFriendQuery.trim().toLowerCase();
    if (!query) return [...MOCK_FRIENDS];
    return MOCK_FRIENDS.filter(
      (friend) =>
        friend.username.toLowerCase().includes(query) ||
        friend.displayName.toLowerCase().includes(query)
    );
  }, [searchFriendQuery]);

  const revokeInvite = (id) => {
    setInvites((current) => current.filter((invite) => invite.id !== id));
    repository.remove(id);
  };

  const generateNewInvite = () => {
    const invite = {
      id: crypto.randomUUID?.() || String(Date.now()),
      inviter: {
        name: "You",
        avatar: "https://i.pravatar.cc/150?u=you",
      },
      channel: "general",
      code: Math.random().toString(36).substring(2, 10),
      uses: 0,
      expiresAt: Date.now() + 604800000,
      roles: [],
    };
    setInvites((current) => [invite, ...current]);
    repository.create(invite);
  };

  return {
    invites,
    revokeInvite,
    generateNewInvite,
    isInvitesPaused,
    setIsInvitesPaused,
    friends,
    searchFriendQuery,
    setSearchFriendQuery,
    pauseDialogOpen,
    setPauseDialogOpen,
    createDialogOpen,
    setCreateDialogOpen,
  };
}

import { useState, useMemo } from "react";
import { useGetInvitesQuery, useCreateInviteMutation, useDeleteInviteMutation } from "../../../../api/inviteApi";

const MOCK_FRIENDS = [
  { id: "1", username: "user1", displayName: "user1", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "2", username: "user2", displayName: "user2", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "3", username: "user3", displayName: "user3", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "4", username: "user4", displayName: "user4", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "5", username: "user5", displayName: "user5", avatar: "https://i.pravatar.cc/150?u=5" },
  { id: "6", username: "user6", displayName: "user6", avatar: "https://i.pravatar.cc/150?u=6" },
  { id: "7", username: "user7", displayName: "user7", avatar: "https://i.pravatar.cc/150?u=7" },
  { id: "8", username: "user8", displayName: "user8", avatar: "https://i.pravatar.cc/150?u=8" },
];

export function useInvites(serverId = "server-1") {
  // RTK Query hooks automatically handle fetch, loading state, and caching
  const { data: fetchedInvites = [], isLoading } = useGetInvitesQuery(serverId);
  const [createInviteApi] = useCreateInviteMutation();
  const [deleteInviteApi] = useDeleteInviteMutation();

  const [friends, setFriends] = useState(MOCK_FRIENDS);

  const [isInvitesPaused, setIsInvitesPaused] = useState(false);
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [searchFriendQuery, setSearchFriendQuery] = useState("");

  // Map data whenever fetchedInvites updates from Redux store
  const invites = useMemo(() => {
    return fetchedInvites.map(inv => ({
      id: inv.inviteCode || inv.id,
      inviter: {
        name: inv.inviterName || "Unknown",
        avatar: inv.inviterAvatar || "https://cdn.discordapp.com/embed/avatars/0.png",
      },
      channel: inv.channelName || "general",
      code: inv.inviteCode || inv.code,
      uses: inv.uses || 0,
      expiresAt: inv.expiresAt ? new Date(inv.expiresAt).getTime() : Date.now() + 86400000,
      roles: inv.roles || [],
    }));
  }, [fetchedInvites]);

  const filteredFriends = useMemo(() => {
    if (!searchFriendQuery) return friends;
    const q = searchFriendQuery.toLowerCase();
    return friends.filter(f => f.username.toLowerCase().includes(q) || f.displayName.toLowerCase().includes(q));
  }, [friends, searchFriendQuery]);

  const revokeInvite = async (id) => {
    try {
      await deleteInviteApi({ serverId, inviteCode: id }).unwrap();
    } catch (err) {
      console.error("Failed to revoke invite:", err);
    }
  };

  const generateNewInvite = async () => {
    try {
      await createInviteApi({
        serverId,
        data: { maxUses: 0, expiresInText: "1:00:00:00" }
      }).unwrap();
    } catch (err) {
      console.error("Failed to create invite:", err);
    }
  };

  return {
    invites,
    revokeInvite,
    generateNewInvite,
    isInvitesPaused,
    setIsInvitesPaused,
    isLoading,
    friends: filteredFriends,
    searchFriendQuery,
    setSearchFriendQuery,
    pauseDialogOpen,
    setPauseDialogOpen,
    createDialogOpen,
    setCreateDialogOpen,
  };
}

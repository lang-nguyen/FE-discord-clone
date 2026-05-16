import { useState, useMemo } from "react";
import { useGetInvitesQuery, useCreateInviteMutation, useDeleteInviteMutation } from "@/api/inviteApi";

const MOCK_FRIENDS = [
  { id: "3fa85f64-5717-4562-b3fc-2c963f66afa1", username: "user1", displayName: "user1", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "3fa85f64-5717-4562-b3fc-2c963f66afa2", username: "user2", displayName: "user2", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "3fa85f64-5717-4562-b3fc-2c963f66afa3", username: "user3", displayName: "user3", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "3fa85f64-5717-4562-b3fc-2c963f66afa4", username: "user4", displayName: "user4", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "3fa85f64-5717-4562-b3fc-2c963f66afa5", username: "user5", displayName: "user5", avatar: "https://i.pravatar.cc/150?u=5" },
  { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", username: "user6", displayName: "user6", avatar: "https://i.pravatar.cc/150?u=6" },
  { id: "3fa85f64-5717-4562-b3fc-2c963f66afa7", username: "user7", displayName: "user7", avatar: "https://i.pravatar.cc/150?u=7" },
  { id: "3fa85f64-5717-4562-b3fc-2c963f66afa8", username: "user8", displayName: "user8", avatar: "https://i.pravatar.cc/150?u=8" },
];

export function useInvites(serverId = "12345678-1234-1234-1234-123456789012") {
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
      await deleteInviteApi(id).unwrap();
    } catch (err) {
      console.error("Failed to revoke invite:", err);
    }
  };

  const generateNewInvite = async () => {
    try {
      await createInviteApi({
        serverId,
        data: { maxUses: 0, expiryHours: 24 }
      }).unwrap();
    } catch (err) {
      console.error("Failed to create invite:", err);
    }
  };

  const inviteFriend = async (friendId) => {
    try {
      await createInviteApi({
        serverId,
        data: { invitedUserId: friendId, maxUses: 1, expiryHours: 24 }
      }).unwrap();
    } catch (err) {
      console.error("Failed to invite friend:", err);
    }
  };

  return {
    invites,
    revokeInvite,
    generateNewInvite,
    inviteFriend,
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

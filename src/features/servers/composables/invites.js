import { useState, useMemo } from "react";

const MOCK_INVITES = [
  {
    id: "1",
    inviter: {
      name: "sweet6th8",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    channel: "general",
    code: "c6mEsCjm",
    uses: 0,
    expiresAt: Date.now() + 90106000, // ~1 day, 1 hour, 1 minute
    roles: [],
  }
];

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

export function useInvites() {
  const [invites, setInvites] = useState(MOCK_INVITES);
  const [friends, setFriends] = useState(MOCK_FRIENDS);

  const [isInvitesPaused, setIsInvitesPaused] = useState(false);

  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const [searchFriendQuery, setSearchFriendQuery] = useState("");

  const filteredFriends = useMemo(() => {
    if (!searchFriendQuery) return friends;
    const q = searchFriendQuery.toLowerCase();
    return friends.filter(f => f.username.toLowerCase().includes(q) || f.displayName.toLowerCase().includes(q));
  }, [friends, searchFriendQuery]);

  const revokeInvite = (id) => {
    setInvites(prev => prev.filter(inv => inv.id !== id));
  };

  const generateNewInvite = () => {
    const code = Math.random().toString(36).substring(2, 10);
    const newInvite = {
      id: Date.now().toString(),
      inviter: {
        name: "You",
        avatar: "https://i.pravatar.cc/150?u=you",
      },
      channel: "general",
      code: code,
      uses: 0,
      expiresAt: Date.now() + 604800000, // +7 days
      roles: [],
    };
    setInvites(prev => [newInvite, ...prev]);
  };

  return {
    invites,
    revokeInvite,
    generateNewInvite,
    isInvitesPaused,
    setIsInvitesPaused,
    friends: filteredFriends,
    searchFriendQuery,
    setSearchFriendQuery,
    pauseDialogOpen,
    setPauseDialogOpen,
    createDialogOpen,
    setCreateDialogOpen,
  };
}

import { useState, useCallback, useMemo, useEffect } from "react";

const INITIAL_MEMBERS = [
  { id: "1", username: "thien", name: "thien", memberSince: "Aug 10, 2023", joinedDiscord: "May 5, 2020", joinMethod: "Invite", roles: ["role-1"], lastSeenTs: Date.now() - (40 * 86400000), isTimeout: false, timeoutUntil: null },
  { id: "2", username: "nieahh_04", name: "nieahh_04", memberSince: "Jan 15, 2024", joinedDiscord: "Dec 12, 2021", joinMethod: "Invite", roles: ["role-2"], lastSeenTs: Date.now() - (20 * 86400000), isTimeout: false, timeoutUntil: null },
];

// Sinh thêm data giả lập
for (let i = 3; i <= 50; i++) {
  INITIAL_MEMBERS.push({
    id: i.toString(),
    username: `user_${i}`,
    name: `User ${i}`,
    memberSince: "Feb 1, 2024",
    joinedDiscord: "Jan 1, 2022",
    joinMethod: "Invite",
    roles: [],
    lastSeenTs: Date.now() - (i * 100000000),
    isTimeout: false,
    timeoutUntil: null
  });
}

export function useMembers({ serverName }) {
  console.log("useMembers hook initialized");
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState("member-newest");
  const [showMembersInChannel, setShowMembersInChannel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Dialog states
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [transferTarget, setTransferTarget] = useState(null);
  const [transferAcknowledged, setTransferAcknowledged] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [banTarget, setBanTarget] = useState(null);
  const [changeNicknameDialogOpen, setChangeNicknameDialogOpen] = useState(false);
  const [changeNicknameTarget, setChangeNicknameTarget] = useState(null);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [blockTarget, setBlockTarget] = useState(null);
  const [timeoutDialogOpen, setTimeoutDialogOpen] = useState(false);
  const [timeoutTarget, setTimeoutTarget] = useState(null);
  const [kickDialogOpen, setKickDialogOpen] = useState(false);
  const [kickTarget, setKickTarget] = useState(null);
  const [pruneDialogOpen, setPruneDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Filter & Sort members
  const filteredAndSortedMembers = useMemo(() => {
    let result = [...members];
    
    // Sort logic
    result.sort((a, b) => {
      if (sortMode === "member-newest") return parseInt(b.id) - parseInt(a.id);
      if (sortMode === "member-oldest") return parseInt(a.id) - parseInt(b.id);
      
      // Giả lập join discord dựa trên timestamp ảo (lastSeenTs hoặc join date)
      // Trong thực tế sẽ so sánh timestamp của joinedDiscord
      if (sortMode === "discord-newest") return b.lastSeenTs - a.lastSeenTs;
      if (sortMode === "discord-oldest") return a.lastSeenTs - b.lastSeenTs;
      
      return 0;
    });

    if (searchQuery) {
      result = result.filter(m => 
        (m.username || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.id || "").includes(searchQuery)
      );
    }
    return result.slice(0, page * 20);
  }, [members, searchQuery, page, sortMode]);

  const changeSortMode = useCallback((mode) => {
    setSortMode(mode);
  }, []);

  const fetchNextPage = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setPage(prev => prev + 1);
      if (page * 20 >= members.length) setHasMore(false);
      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMore, page, members.length]);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  }, []);

  // Handlers
  const openTransferDialog = useCallback((m) => { setTransferTarget(m); setTransferDialogOpen(true); }, []);
  const closeTransferDialog = useCallback(() => { setTransferDialogOpen(false); setTransferTarget(null); }, []);
  const proceedToVerification = useCallback(() => setVerificationStep(true), []);
  const confirmTransfer = useCallback(() => { showToast("Ownership transferred"); closeTransferDialog(); }, [showToast, closeTransferDialog]);

  const openBanDialog = useCallback((m) => { setBanTarget(m); setBanDialogOpen(true); }, []);
  const closeBanDialog = useCallback(() => { setBanDialogOpen(false); setBanTarget(null); }, []);
  const confirmBan = useCallback(() => { setMembers(prev => prev.filter(m => m.id !== banTarget?.id)); showToast("Member banned"); closeBanDialog(); }, [banTarget, closeBanDialog, showToast]);

  const openChangeNicknameDialog = useCallback((m) => { setChangeNicknameTarget(m); setChangeNicknameDialogOpen(true); }, []);
  const closeChangeNicknameDialog = useCallback(() => { setChangeNicknameDialogOpen(false); setChangeNicknameTarget(null); }, []);
  const confirmChangeNickname = useCallback((nick) => { setMembers(prev => prev.map(m => m.id === changeNicknameTarget?.id ? { ...m, name: nick || m.name } : m)); showToast("Nickname changed"); closeChangeNicknameDialog(); }, [changeNicknameTarget, closeChangeNicknameDialog, showToast]);

  const openBlockDialog = useCallback((m) => { setBlockTarget(m); setBlockDialogOpen(true); }, []);
  const closeBlockDialog = useCallback(() => { setBlockDialogOpen(false); setBlockTarget(null); }, []);
  const confirmBlock = useCallback(() => { setMembers(prev => prev.filter(m => m.id !== blockTarget?.id)); showToast("Member blocked"); closeBlockDialog(); }, [blockTarget, closeBlockDialog, showToast]);

  const openTimeoutDialog = useCallback((m) => { setTimeoutTarget(m); setTimeoutDialogOpen(true); }, []);
  const closeTimeoutDialog = useCallback(() => { setTimeoutDialogOpen(false); setTimeoutTarget(null); }, []);
  const confirmTimeout = useCallback((dur, reason) => {
    if (!timeoutTarget) return;
    const isRemoving = timeoutTarget.isTimeout;
    let ms = 0;
    if (dur === "60s") ms = 60000;
    else if (dur === "5m") ms = 300000;
    else if (dur === "10m") ms = 600000;
    else if (dur === "1h") ms = 3600000;
    else if (dur === "1d") ms = 86400000;
    else if (dur === "1w") ms = 604800000;
    const until = isRemoving ? null : Date.now() + ms;
    setMembers(prev => prev.map(m => m.id === timeoutTarget.id ? { ...m, isTimeout: !m.isTimeout, timeoutUntil: until } : m));
    showToast(isRemoving ? "Timeout removed" : "Member timed out");
    closeTimeoutDialog();
  }, [timeoutTarget, closeTimeoutDialog, showToast]);

  const openKickDialog = useCallback((m) => { setKickTarget(m); setKickDialogOpen(true); }, []);
  const closeKickDialog = useCallback(() => { setKickDialogOpen(false); setKickTarget(null); }, []);
  const confirmKick = useCallback(() => { setMembers(prev => prev.filter(m => m.id !== kickTarget?.id)); showToast("Member kicked"); closeKickDialog(); }, [kickTarget, closeKickDialog, showToast]);

  const openPruneDialog = useCallback(() => setPruneDialogOpen(true), []);
  const closePruneDialog = useCallback(() => setPruneDialogOpen(false), []);

  const confirmPrune = useCallback((days, roleId) => {
    const cutoffTs = Date.now() - (parseInt(days) * 86400000);
    setMembers(prev => prev.filter(m => {
      if (m.lastSeenTs >= cutoffTs) return true;
      const hasNoRoles = m.roles.length === 0;
      const hasSelectedRole = roleId ? m.roles.includes(roleId) : false;
      return !(hasNoRoles || hasSelectedRole);
    }));
    showToast(`Members pruned successfully for ${days} days`);
    setPruneDialogOpen(false);
  }, [showToast]);

  // Auto-remove timeout
  useEffect(() => {
    const itv = setInterval(() => {
      const now = Date.now();
      setMembers(prev => {
        let changed = false;
        const next = prev.map(m => {
          if (m.isTimeout && m.timeoutUntil && now > m.timeoutUntil) { changed = true; return { ...m, isTimeout: false, timeoutUntil: null }; }
          return m;
        });
        return changed ? next : prev;
      });
    }, 1000);
    return () => clearInterval(itv);
  }, []);

  return {
    members: filteredAndSortedMembers,
    allMembers: members,
    searchQuery, setSearchQuery,
    sortMode, changeSortMode,
    showMembersInChannel, setShowMembersInChannel,
    isLoading, hasMore, fetchNextPage,
    transferDialogOpen, transferTarget, transferAcknowledged, setTransferAcknowledged, verificationStep, verificationCode, setVerificationCode, openTransferDialog, closeTransferDialog, proceedToVerification, confirmTransfer,
    banDialogOpen, banTarget, openBanDialog, closeBanDialog, confirmBan,
    pruneDialogOpen, openPruneDialog, closePruneDialog, confirmPrune,
    changeNicknameDialogOpen, changeNicknameTarget, openChangeNicknameDialog, closeChangeNicknameDialog, confirmChangeNickname,
    blockDialogOpen, blockTarget, openBlockDialog, closeBlockDialog, confirmBlock,
    timeoutDialogOpen, timeoutTarget, openTimeoutDialog, closeTimeoutDialog, confirmTimeout,
    kickDialogOpen, kickTarget, openKickDialog, closeKickDialog, confirmKick,
    toastMessage,
  };
}

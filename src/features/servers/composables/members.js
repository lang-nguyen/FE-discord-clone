import { useState, useCallback, useMemo, useEffect } from "react";
import {
  kickMember,
  banMember,
  unbanMember,
  blockMember,
  unblockMember,
  transferOwnership,
  joinServer,
  leaveServer,
  changeNickname,
  pruneMembers,
  getBans,
  getMembers,
} from "../api/members";

/**
 * useMembers composable
 *
 * Quản lý toàn bộ trạng thái và hành động liên quan đến member của một server.
 * Mọi lời gọi API đều được uỷ quyền cho layer `../api/members`.
 *
 * @param {object} params
 * @param {string} params.serverId  - ID của server (GUID từ BE)
 * @param {string} params.serverName - Tên server (dùng cho display)
 */
export function useMembers({ serverId, serverName }) {
  // ── Data state ──────────────────────────────────────────────────────────────
  const [members, setMembers] = useState([]);
  const [bans, setBans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Filter / pagination ──────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState("member-newest");
  const [showMembersInChannel, setShowMembersInChannel] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // ── Dialog states ────────────────────────────────────────────────────────────
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

  // ── Toast helper ─────────────────────────────────────────────────────────────
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  }, []);

  // ── Filter & Sort ─────────────────────────────────────────────────────────────
  const filteredAndSortedMembers = useMemo(() => {
    let result = [...members];

    result.sort((a, b) => {
      if (sortMode === "member-newest") return b.joinedAtTs - a.joinedAtTs;
      if (sortMode === "member-oldest") return a.joinedAtTs - b.joinedAtTs;
      if (sortMode === "discord-newest") return b.lastSeenTs - a.lastSeenTs;
      if (sortMode === "discord-oldest") return a.lastSeenTs - b.lastSeenTs;
      return 0;
    });

    if (searchQuery) {
      result = result.filter(
        (m) =>
          (m.username || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (m.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (m.id || "").includes(searchQuery)
      );
    }

    return result.slice(0, page * 20);
  }, [members, searchQuery, page, sortMode]);

  const changeSortMode = useCallback((mode) => setSortMode(mode), []);

  const fetchNextPage = useCallback(async () => {
    if (isLoading || !hasMore || !serverId) return;
    setIsLoading(true);
    try {
      const res = await getMembers(serverId, page, 20);
      const rawMembers = res?.items || res || [];
      const newMembers = rawMembers.map(m => ({
        id: m.userId,
        memberId: m.memberId,
        userId: m.userId,
        name: m.topRoleName ? `User ${m.userId.substring(0,4)}` : "Test Member",
        username: `user_${m.userId.substring(0,8)}`,
        memberSince: new Date(m.joinedAt).toLocaleDateString(),
        joinedDiscord: "Unknown",
        joinMethod: m.joinMethod || "Unknown",
        roles: m.roleIds || [],
        isTimeout: false,
        timeoutUntil: null,
        joinedAtTs: new Date(m.joinedAt).getTime(),
        lastSeenTs: 0
      }));
      
      if (page === 1) {
        setMembers(newMembers);
      } else {
        setMembers((prev) => [...prev, ...newMembers]);
      }
      
      setHasMore(newMembers.length === 20);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(err);
      setHasMore(false); // Stop infinite loop on error
      showToast(err.message || "Failed to load members");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page, serverId, showToast]);

  // Initial fetch
  useEffect(() => {
    if (serverId) {
      setPage(1);
      setMembers([]);
      setHasMore(true);
      
      // We need to fetch the first page immediately
      setIsLoading(true);
      getMembers(serverId, 1, 20)
        .then((res) => {
          const rawMembers = res?.items || res || [];
          const newMembers = rawMembers.map(m => ({
            id: m.userId,
            memberId: m.memberId,
            userId: m.userId,
            name: m.topRoleName ? `User ${m.userId.substring(0,4)}` : "Test Member",
            username: `user_${m.userId.substring(0,8)}`,
            memberSince: new Date(m.joinedAt).toLocaleDateString(),
            joinedDiscord: "Unknown",
            joinMethod: m.joinMethod || "Unknown",
            roles: m.roleIds || [],
            isTimeout: false,
            timeoutUntil: null,
            joinedAtTs: new Date(m.joinedAt).getTime(),
            lastSeenTs: 0
          }));
          setMembers(newMembers);
          setHasMore(newMembers.length === 20);
          setPage(2);
        })
        .catch((err) => {
          setError(err);
          setHasMore(false); // Stop infinite loop on error
          showToast(err.message || "Failed to load members");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [serverId, showToast]);

  // ── Auto-remove expired timeout ──────────────────────────────────────────────
  useEffect(() => {
    const itv = setInterval(() => {
      const now = Date.now();
      setMembers((prev) => {
        let changed = false;
        const next = prev.map((m) => {
          if (m.isTimeout && m.timeoutUntil && now > m.timeoutUntil) {
            changed = true;
            return { ...m, isTimeout: false, timeoutUntil: null };
          }
          return m;
        });
        return changed ? next : prev;
      });
    }, 1000);
    return () => clearInterval(itv);
  }, []);

  // ── Kick ─────────────────────────────────────────────────────────────────────
  const openKickDialog = useCallback((m) => { setKickTarget(m); setKickDialogOpen(true); }, []);
  const closeKickDialog = useCallback(() => { setKickDialogOpen(false); setKickTarget(null); }, []);

  const confirmKick = useCallback(async (reason = null) => {
    if (!kickTarget || !serverId) return;
    try {
      await kickMember(serverId, kickTarget.id, reason);
      setMembers((prev) => prev.filter((m) => m.id !== kickTarget.id));
      showToast("Member kicked");
    } catch (err) {
      showToast(err.message || "Failed to kick member");
    } finally {
      closeKickDialog();
    }
  }, [kickTarget, serverId, showToast, closeKickDialog]);

  // ── Ban ──────────────────────────────────────────────────────────────────────
  const openBanDialog = useCallback((m) => { setBanTarget(m); setBanDialogOpen(true); }, []);
  const closeBanDialog = useCallback(() => { setBanDialogOpen(false); setBanTarget(null); }, []);

  const confirmBan = useCallback(async (reason = null) => {
    if (!banTarget || !serverId) return;
    try {
      await banMember(serverId, banTarget.id, reason);
      setMembers((prev) => prev.filter((m) => m.id !== banTarget.id));
      showToast("Member banned");
    } catch (err) {
      showToast(err.message || "Failed to ban member");
    } finally {
      closeBanDialog();
    }
  }, [banTarget, serverId, showToast, closeBanDialog]);

  // ── Unban ────────────────────────────────────────────────────────────────────
  const confirmUnban = useCallback(async (memberId) => {
    if (!serverId) return;
    try {
      await unbanMember(serverId, memberId);
      showToast("Member unbanned");
    } catch (err) {
      showToast(err.message || "Failed to unban member");
    }
  }, [serverId, showToast]);

  // ── Block ────────────────────────────────────────────────────────────────────
  const openBlockDialog = useCallback((m) => { setBlockTarget(m); setBlockDialogOpen(true); }, []);
  const closeBlockDialog = useCallback(() => { setBlockDialogOpen(false); setBlockTarget(null); }, []);

  const confirmBlock = useCallback(async () => {
    if (!blockTarget || !serverId) return;
    try {
      await blockMember(serverId, blockTarget.id);
      setMembers((prev) => prev.filter((m) => m.id !== blockTarget.id));
      showToast("Member blocked");
    } catch (err) {
      showToast(err.message || "Failed to block member");
    } finally {
      closeBlockDialog();
    }
  }, [blockTarget, serverId, showToast, closeBlockDialog]);

  // ── Unblock ──────────────────────────────────────────────────────────────────
  const confirmUnblock = useCallback(async (memberId) => {
    if (!serverId) return;
    try {
      await unblockMember(serverId, memberId);
      showToast("Member unblocked");
    } catch (err) {
      showToast(err.message || "Failed to unblock member");
    }
  }, [serverId, showToast]);

  // ── Transfer Ownership ────────────────────────────────────────────────────────
  const openTransferDialog = useCallback((m) => { setTransferTarget(m); setTransferDialogOpen(true); }, []);
  const closeTransferDialog = useCallback(() => {
    setTransferDialogOpen(false);
    setTransferTarget(null);
    setTransferAcknowledged(false);
    setVerificationStep(false);
    setVerificationCode("");
  }, []);
  const proceedToVerification = useCallback(() => setVerificationStep(true), []);

  const confirmTransfer = useCallback(async () => {
    if (!transferTarget || !serverId) return;
    try {
      await transferOwnership(serverId, transferTarget.id);
      showToast("Ownership transferred");
    } catch (err) {
      showToast(err.message || "Failed to transfer ownership");
    } finally {
      closeTransferDialog();
    }
  }, [transferTarget, serverId, showToast, closeTransferDialog]);

  // ── Join / Leave ──────────────────────────────────────────────────────────────
  const handleJoinServer = useCallback(async () => {
    if (!serverId) return;
    try {
      await joinServer(serverId);
      showToast("Joined server");
    } catch (err) {
      showToast(err.message || "Failed to join server");
    }
  }, [serverId, showToast]);

  const handleLeaveServer = useCallback(async () => {
    if (!serverId) return;
    try {
      await leaveServer(serverId);
      showToast("Left server");
    } catch (err) {
      showToast(err.message || "Failed to leave server");
    }
  }, [serverId, showToast]);

  // ── Change Nickname (real API) ────────────────────────────────────────────────
  const openChangeNicknameDialog = useCallback((m) => { setChangeNicknameTarget(m); setChangeNicknameDialogOpen(true); }, []);
  const closeChangeNicknameDialog = useCallback(() => { setChangeNicknameDialogOpen(false); setChangeNicknameTarget(null); }, []);
  const confirmChangeNickname = useCallback(async (nick) => {
    if (!changeNicknameTarget || !serverId) return;
    try {
      await changeNickname(serverId, changeNicknameTarget.id, nick || null);
      setMembers((prev) =>
        prev.map((m) =>
          m.id === changeNicknameTarget?.id ? { ...m, name: nick || m.username } : m
        )
      );
      showToast("Nickname changed");
    } catch (err) {
      showToast(err.message || "Failed to change nickname");
    } finally {
      closeChangeNicknameDialog();
    }
  }, [changeNicknameTarget, serverId, showToast, closeChangeNicknameDialog]);

  // ── Timeout (local only — no BE endpoint yet) ─────────────────────────────────
  const openTimeoutDialog = useCallback((m) => { setTimeoutTarget(m); setTimeoutDialogOpen(true); }, []);
  const closeTimeoutDialog = useCallback(() => { setTimeoutDialogOpen(false); setTimeoutTarget(null); }, []);
  const confirmTimeout = useCallback((dur, _reason) => {
    if (!timeoutTarget) return;
    const isRemoving = timeoutTarget.isTimeout;
    const durationMap = { "60s": 60000, "5m": 300000, "10m": 600000, "1h": 3600000, "1d": 86400000, "1w": 604800000 };
    const until = isRemoving ? null : Date.now() + (durationMap[dur] || 0);
    setMembers((prev) =>
      prev.map((m) =>
        m.id === timeoutTarget.id ? { ...m, isTimeout: !m.isTimeout, timeoutUntil: until } : m
      )
    );
    showToast(isRemoving ? "Timeout removed" : "Member timed out");
    closeTimeoutDialog();
  }, [timeoutTarget, showToast, closeTimeoutDialog]);

  // ── Prune (real API) ──────────────────────────────────────────────────────────
  const openPruneDialog = useCallback(() => setPruneDialogOpen(true), []);
  const closePruneDialog = useCallback(() => setPruneDialogOpen(false), []);
  const confirmPrune = useCallback(async (days, roleId) => {
    if (!serverId) return;
    try {
      const result = await pruneMembers(serverId, parseInt(days), roleId || null);
      showToast(`${result?.pruned ?? 0} members pruned successfully`);
      // Refresh local list by removing pruned members
      const cutoffTs = Date.now() - parseInt(days) * 86400000;
      setMembers((prev) =>
        prev.filter((m) => {
          if (m.lastSeenTs >= cutoffTs) return true;
          const hasNoRoles = m.roles.length === 0;
          const hasSelectedRole = roleId ? m.roles.includes(roleId) : false;
          return !(hasNoRoles || hasSelectedRole);
        })
      );
    } catch (err) {
      showToast(err.message || "Failed to prune members");
    } finally {
      setPruneDialogOpen(false);
    }
  }, [serverId, showToast]);

  // ── Get Bans (real API) ───────────────────────────────────────────────────────
  const fetchBans = useCallback(async () => {
    if (!serverId) return;
    try {
      const data = await getBans(serverId);
      setBans(data);
    } catch (err) {
      showToast(err.message || "Failed to load ban list");
    }
  }, [serverId, showToast]);

  // ── Public API ────────────────────────────────────────────────────────────────
  return {
    // Data
    members: filteredAndSortedMembers,
    allMembers: members,
    bans,
    isLoading,
    error,
    hasMore,

    // Filter & sort
    searchQuery, setSearchQuery,
    sortMode, changeSortMode,
    showMembersInChannel, setShowMembersInChannel,
    fetchNextPage,

    // Kick
    kickDialogOpen, kickTarget,
    openKickDialog, closeKickDialog, confirmKick,

    // Ban
    banDialogOpen, banTarget,
    openBanDialog, closeBanDialog, confirmBan,

    // Unban / Unblock (no dialog needed, called directly)
    confirmUnban,
    confirmUnblock,

    // Block
    blockDialogOpen, blockTarget,
    openBlockDialog, closeBlockDialog, confirmBlock,

    // Transfer ownership
    transferDialogOpen, transferTarget,
    transferAcknowledged, setTransferAcknowledged,
    verificationStep, verificationCode, setVerificationCode,
    openTransferDialog, closeTransferDialog,
    proceedToVerification, confirmTransfer,

    // Join / Leave
    handleJoinServer,
    handleLeaveServer,

    // Change nickname
    changeNicknameDialogOpen, changeNicknameTarget,
    openChangeNicknameDialog, closeChangeNicknameDialog, confirmChangeNickname,

    // Timeout
    timeoutDialogOpen, timeoutTarget,
    openTimeoutDialog, closeTimeoutDialog, confirmTimeout,

    // Prune
    pruneDialogOpen, openPruneDialog, closePruneDialog, confirmPrune,

    // Bans
    fetchBans,

    // Toast
    toastMessage,
  };
}

import { useEffect, useMemo, useState } from "react";
import { getSettingsRepository } from "@/features/server-settings/repositories/getRepository";

const PAGE_SIZE = 20;

function timeoutDuration(value) {
  return (
    {
      "60s": 60000,
      "5m": 300000,
      "10m": 600000,
      "1h": 3600000,
      "1d": 86400000,
      "1w": 604800000,
    }[value] || 0
  );
}

export function useMembers({ serverName }) {
  const membersRepository = useMemo(
    () => getSettingsRepository("members", serverName),
    [serverName]
  );
  const bansRepository = useMemo(() => getSettingsRepository("bans", serverName), [serverName]);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState("member-newest");
  const [showMembersInChannel, setShowMembersInChannel] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [dialog, setDialog] = useState({ type: null, member: null });
  const [transferAcknowledged, setTransferAcknowledged] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    membersRepository.list().then((items) => {
      if (active) {
        setMembers(items);
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [membersRepository]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = Date.now();
      setMembers((current) => {
        const next = current.map((member) =>
          member.isTimeout && member.timeoutUntil < now
            ? { ...member, isTimeout: false, timeoutUntil: null }
            : member
        );
        if (next.some((member, index) => member !== current[index])) {
          membersRepository.replace(next);
          return next;
        }
        return current;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [membersRepository]);

  const visibleMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result = members.filter(
      (member) =>
        !query ||
        member.username.toLowerCase().includes(query) ||
        member.name.toLowerCase().includes(query) ||
        member.id.includes(query)
    );

    result.sort((a, b) => {
      if (sortMode === "member-newest") return Number(b.id) - Number(a.id);
      if (sortMode === "member-oldest") return Number(a.id) - Number(b.id);
      if (sortMode === "discord-newest") return b.lastSeenTs - a.lastSeenTs;
      return a.lastSeenTs - b.lastSeenTs;
    });

    return result.slice(0, page * PAGE_SIZE);
  }, [members, page, searchQuery, sortMode]);

  const showToast = (message) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 3000);
  };
  const openDialog = (type, member = null) => setDialog({ type, member });
  const closeDialog = () => {
    setDialog({ type: null, member: null });
    setTransferAcknowledged(false);
    setVerificationStep(false);
    setVerificationCode("");
  };
  const commit = (nextMembers) => {
    setMembers(nextMembers);
    return membersRepository.replace(nextMembers);
  };

  const confirmBan = async () => {
    if (!dialog.member) return;
    const ban = { ...dialog.member, reason: "Banned by Admin" };
    await bansRepository.create(ban);
    await commit(members.filter((member) => member.id !== dialog.member.id));
    showToast("Member banned");
    closeDialog();
  };
  const confirmChangeNickname = async (nickname) => {
    if (!dialog.member) return;
    const next = members.map((member) =>
      member.id === dialog.member.id ? { ...member, name: nickname || member.name } : member
    );
    await commit(next);
    showToast("Nickname changed");
    closeDialog();
  };
  const confirmBlock = async () => {
    if (!dialog.member) return;
    const isBlocked = !dialog.member.isBlocked;
    const next = members.map((member) =>
      member.id === dialog.member.id ? { ...member, isBlocked } : member
    );
    await commit(next);
    showToast(isBlocked ? "Member blocked" : "Member unblocked");
    closeDialog();
  };
  const confirmTimeout = async (duration) => {
    if (!dialog.member) return;
    const remove = dialog.member.isTimeout;
    const next = members.map((member) =>
      member.id === dialog.member.id
        ? {
            ...member,
            isTimeout: !remove,
            timeoutUntil: remove ? null : Date.now() + timeoutDuration(duration),
          }
        : member
    );
    await commit(next);
    showToast(remove ? "Timeout removed" : "Member timed out");
    closeDialog();
  };
  const confirmKick = async () => {
    if (!dialog.member) return;
    await commit(members.filter((member) => member.id !== dialog.member.id));
    showToast("Member kicked");
    closeDialog();
  };
  const confirmPrune = async (days, roleId) => {
    const cutoff = Date.now() - Number(days) * 86400000;
    const next = members.filter((member) => {
      if (member.lastSeenTs >= cutoff) return true;
      return !(!member.roles.length || (roleId && member.roles.includes(roleId)));
    });
    await commit(next);
    showToast(`Members pruned successfully for ${days} days`);
    closeDialog();
  };

  return {
    members: visibleMembers,
    allMembers: members,
    searchQuery,
    setSearchQuery,
    sortMode,
    changeSortMode: setSortMode,
    showMembersInChannel,
    setShowMembersInChannel,
    isLoading,
    hasMore: visibleMembers.length < members.length,
    fetchNextPage: () => setPage((current) => current + 1),
    transferDialogOpen: dialog.type === "transfer",
    transferTarget: dialog.type === "transfer" ? dialog.member : null,
    transferAcknowledged,
    setTransferAcknowledged,
    verificationStep,
    verificationCode,
    setVerificationCode,
    openTransferDialog: (member) => openDialog("transfer", member),
    closeTransferDialog: closeDialog,
    proceedToVerification: () => setVerificationStep(true),
    confirmTransfer: () => {
      showToast("Ownership transferred");
      closeDialog();
    },
    banDialogOpen: dialog.type === "ban",
    banTarget: dialog.type === "ban" ? dialog.member : null,
    openBanDialog: (member) => openDialog("ban", member),
    closeBanDialog: closeDialog,
    confirmBan,
    pruneDialogOpen: dialog.type === "prune",
    openPruneDialog: () => openDialog("prune"),
    closePruneDialog: closeDialog,
    confirmPrune,
    changeNicknameDialogOpen: dialog.type === "nickname",
    changeNicknameTarget: dialog.type === "nickname" ? dialog.member : null,
    openChangeNicknameDialog: (member) => openDialog("nickname", member),
    closeChangeNicknameDialog: closeDialog,
    confirmChangeNickname,
    blockDialogOpen: dialog.type === "block",
    blockTarget: dialog.type === "block" ? dialog.member : null,
    openBlockDialog: (member) => openDialog("block", member),
    closeBlockDialog: closeDialog,
    confirmBlock,
    timeoutDialogOpen: dialog.type === "timeout",
    timeoutTarget: dialog.type === "timeout" ? dialog.member : null,
    openTimeoutDialog: (member) => openDialog("timeout", member),
    closeTimeoutDialog: closeDialog,
    confirmTimeout,
    kickDialogOpen: dialog.type === "kick",
    kickTarget: dialog.type === "kick" ? dialog.member : null,
    openKickDialog: (member) => openDialog("kick", member),
    closeKickDialog: closeDialog,
    confirmKick,
    toastMessage,
  };
}

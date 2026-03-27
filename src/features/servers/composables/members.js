import { useState, useCallback, useMemo } from "react";

const MOCK_MEMBERS = [
  {
    id: "1",
    name: "Dũng",
    username: "dung8022",
    avatarUrl: "",
    memberSince: "1 min ago",
    joinedDiscord: "3 years ago",
    joinMethod: "GAAVrmDR",
    roles: [],
    signals: [],
  },
  {
    id: "2",
    name: "HIN",
    username: "hpsd",
    avatarUrl: "",
    memberSince: "3 hrs ago",
    joinedDiscord: "6 years ago",
    joinMethod: "Unknown",
    roles: [],
    signals: [],
  },
];



/**
 * Composable quản lý members:
 * - Danh sách members
 * - Tìm kiếm
 * - Chọn member (context menu)
 * - Transfer ownership flow
 */
export function useMembers({ serverName }) {
  const [members] = useState(MOCK_MEMBERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMembersInChannel, setShowMembersInChannel] = useState(false);

  // Transfer ownership state
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [transferTarget, setTransferTarget] = useState(null);
  const [transferAcknowledged, setTransferAcknowledged] = useState(false);

  // Verification code step
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  // Filter members by search
  const filteredMembers = useMemo(() => {
    if (!searchQuery) return members;
    const q = searchQuery.toLowerCase();
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.username.toLowerCase().includes(q)
    );
  }, [members, searchQuery]);

  // Open transfer ownership dialog for a member
  const openTransferDialog = useCallback((member) => {
    setTransferTarget(member);
    setTransferAcknowledged(false);
    setVerificationStep(false);
    setVerificationCode("");
    setTransferDialogOpen(true);
  }, []);

  // Close transfer dialog
  const closeTransferDialog = useCallback(() => {
    setTransferDialogOpen(false);
    setTransferTarget(null);
    setTransferAcknowledged(false);
    setVerificationStep(false);
    setVerificationCode("");
  }, []);

  // Proceed to verification step
  const proceedToVerification = useCallback(() => {
    if (!transferAcknowledged) return;
    setVerificationStep(true);
  }, [transferAcknowledged]);

  // Confirm transfer
  const confirmTransfer = useCallback(async () => {
    if (!verificationCode) return;
    // TODO: Call API to transfer ownership
    console.log("Transfer ownership to:", transferTarget?.username, "Code:", verificationCode);
    closeTransferDialog();
  }, [verificationCode, transferTarget, closeTransferDialog]);

  return {
    members: filteredMembers,
    totalCount: members.length,
    searchQuery,
    setSearchQuery,
    selectedMember,
    setSelectedMember,
    showMembersInChannel,
    setShowMembersInChannel,

    // Transfer ownership
    transferDialogOpen,
    transferTarget,
    transferAcknowledged,
    setTransferAcknowledged,
    verificationStep,
    verificationCode,
    setVerificationCode,
    openTransferDialog,
    closeTransferDialog,
    proceedToVerification,
    confirmTransfer,
  };
}

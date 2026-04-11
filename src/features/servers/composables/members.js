import { useState, useCallback, useMemo, useEffect } from "react";

// Tạo Mock DB lớn hơn để test cuộn (Infinite Scroll)
const MOCK_DB = Array.from({ length: 75 }).map((_, i) => ({
  id: `${i + 1}`,
  name: `Thành viên ${i + 1}`,
  username: `user_${i + 1}`,
  avatarUrl: "",
  memberSince: `${(i % 5) + 1} days ago`,
  joinedDiscord: `${(i % 3) + 1} years ago`,
  joinMethod: i % 2 === 0 ? "Invite Link" : "Discovery",
  roles: [],
  signals: [],
}));



/**
 * Composable quản lý members:
 * - Danh sách members
 * - Tìm kiếm
 * - Chọn member (context menu)
 * - Transfer ownership flow
 */
export function useMembers({ serverName }) {
  // Trạng thái danh sách
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 20;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMembersInChannel, setShowMembersInChannel] = useState(false);

  // Giả lập Initial Load
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setMembers(MOCK_DB.slice(0, PAGE_SIZE));
      setIsLoading(false);
    }, 600);
  }, []);

  // Giả lập Fetch tiếp theo trang
  const fetchNextPage = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const nextBatch = MOCK_DB.slice(nextPage * PAGE_SIZE, (nextPage + 1) * PAGE_SIZE);
      
      if (nextBatch.length === 0) {
        setHasMore(false);
      } else {
        setMembers(prev => [...prev, ...nextBatch]);
        setPage(nextPage);
        if (nextBatch.length < PAGE_SIZE) setHasMore(false);
      }
      setIsLoading(false);
    }, 1000);
  }, [isLoading, hasMore, page]);

  // Transfer ownership state
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [transferTarget, setTransferTarget] = useState(null);
  const [transferAcknowledged, setTransferAcknowledged] = useState(false);

  // Ban member state
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [banTarget, setBanTarget] = useState(null);

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

  // Open ban dialog
  const openBanDialog = useCallback((member) => {
    setBanTarget(member);
    setBanDialogOpen(true);
  }, []);

  // Close ban dialog
  const closeBanDialog = useCallback(() => {
    setBanDialogOpen(false);
    setBanTarget(null);
  }, []);

  // Confirm ban
  const confirmBan = useCallback(async (reason, deleteHistory) => {
    if (!banTarget) return;
    // TODO: Call API to ban member
    console.log("Banning:", banTarget.username, "Reason:", reason, "Delete history (hours):", deleteHistory);
    closeBanDialog();
  }, [banTarget, closeBanDialog]);

  return {
    members: filteredMembers,
    totalCount: members.length,
    searchQuery,
    setSearchQuery,
    selectedMember,
    setSelectedMember,
    showMembersInChannel,
    setShowMembersInChannel,
    
    // Pagination
    isLoading,
    hasMore,
    fetchNextPage,

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

    // Ban member
    banDialogOpen,
    banTarget,
    openBanDialog,
    closeBanDialog,
    confirmBan,
  };
}

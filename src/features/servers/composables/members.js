import { useState, useCallback, useMemo, useEffect } from "react";

// Tạo Mock DB lớn hơn để test cuộn (Infinite Scroll)
const MOCK_DB = Array.from({ length: 75 }).map((_, i) => {
  const memberTs = Date.now() - (i * 86400000 * 5); // Mỗi user chênh nhau 5 ngày vào Server
  const discordTs = Date.now() - (i * 86400000 * 35); // Mỗi user chênh nhau 35 ngày chơi Discord
  const lastSeenTs = Date.now() - ((i % 40) * 86400000); // offline từ 0 đến 39 ngày
  
  const daysSinceDiscord = Math.floor((Date.now() - discordTs) / 86400000);
  const joinedDiscordStr = daysSinceDiscord >= 365 
    ? `${Math.floor(daysSinceDiscord / 365)} years ago` 
    : `${Math.floor(daysSinceDiscord / 30)} months ago`;

  const daysSinceMember = Math.floor((Date.now() - memberTs) / 86400000);
  const joinedMemberStr = daysSinceMember >= 30
    ? `${Math.floor(daysSinceMember / 30)} months ago`
    : `${daysSinceMember} days ago`;

  // Phân bổ role ảo để test Prune
  let mockRoles = [];
  if (i % 3 === 0) mockRoles = []; // Không có role (đối tượng yếu vị dễ bị prune nhất)
  else if (i % 3 === 1) mockRoles = ["role-1"];
  else mockRoles = ["role-1", "role-2"];

  return {
    id: `${i + 1}`,
    name: `Thành viên ${i + 1}`,
    username: `user_${i + 1}`,
    avatarUrl: "",
    memberSinceTs: memberTs,
    joinedDiscordTs: discordTs,
    lastSeenTs: lastSeenTs,
    memberSince: joinedMemberStr,
    joinedDiscord: joinedDiscordStr,
    joinMethod: i % 2 === 0 ? "Invite Link" : "Discovery",
    roles: mockRoles,
    signals: [],
  };
});



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
  
  // Sort State
  const [sortOption, setSortOption] = useState("member_since_new");

  // Prune State
  const [pruneDialogOpen, setPruneDialogOpen] = useState(false);

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

  // Filter & Sort members
  const filteredAndSortedMembers = useMemo(() => {
    let result = members;
    
    // 1. Lọc theo tìm kiếm
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.username.toLowerCase().includes(q)
      );
    }

    // 2. Sắp xếp theo lựa chọn
    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case "member_since_new":
          return b.memberSinceTs - a.memberSinceTs;
        case "member_since_old":
          return a.memberSinceTs - b.memberSinceTs;
        case "joined_discord_new":
          return b.joinedDiscordTs - a.joinedDiscordTs;
        case "joined_discord_old":
          return a.joinedDiscordTs - b.joinedDiscordTs;
        default:
          return 0;
      }
    });

    return result;
  }, [members, searchQuery, sortOption]);

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
    setMembers(prev => prev.filter(m => m.id !== banTarget.id));
    console.log("Banning:", banTarget.username, "Reason:", reason, "Delete history (hours):", deleteHistory);
    closeBanDialog();
  }, [banTarget, closeBanDialog]);

  // Change Nickname state
  const [changeNicknameDialogOpen, setChangeNicknameDialogOpen] = useState(false);
  const [changeNicknameTarget, setChangeNicknameTarget] = useState(null);

  const openChangeNicknameDialog = useCallback((member) => {
    setChangeNicknameTarget(member);
    setChangeNicknameDialogOpen(true);
  }, []);

  const closeChangeNicknameDialog = useCallback(() => {
    setChangeNicknameDialogOpen(false);
    setChangeNicknameTarget(null);
  }, []);

  const confirmChangeNickname = useCallback((newNickname) => {
    if (!changeNicknameTarget) return;
    setMembers(prev => prev.map(m => {
      if (m.id === changeNicknameTarget.id) {
        return { ...m, name: newNickname || m.name };
      }
      return m;
    }));
    closeChangeNicknameDialog();
  }, [changeNicknameTarget, closeChangeNicknameDialog]);

  // Handle Prune
  const confirmPrune = useCallback((days, roleId) => {
    const cutoffTs = Date.now() - (parseInt(days) * 86400000);
    setMembers(prev => {
      return prev.filter(m => {
        // 1. Còn hoạt động gần đây -> An toàn (Giữ lại)
        if (m.lastSeenTs >= cutoffTs) return true;
        
        // 2. Không hoạt động ngần ấy ngày -> Khoanh vùng chờ duyệt
        const hasNoRoles = m.roles.length === 0;
        const hasSelectedRole = roleId ? m.roles.includes(roleId) : false;
        
        // Nếu không có role hoặc cầm đúng cái Role bị chọn -> Khai tử
        const isPruned = hasNoRoles || hasSelectedRole;
        
        return !isPruned; // true = Sống, false = Chết
      });
    });
    setPruneDialogOpen(false);
  }, []);

  return {
    members: filteredAndSortedMembers,
    totalCount: members.length,
    searchQuery,
    setSearchQuery,
    selectedMember,
    setSelectedMember,
    showMembersInChannel,
    setShowMembersInChannel,
    
    // Sort
    sortOption,
    setSortOption,
    
    // Prune
    pruneDialogOpen,
    openPruneDialog: () => setPruneDialogOpen(true),
    closePruneDialog: () => setPruneDialogOpen(false),
    confirmPrune,
    
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

    // Change Nickname
    changeNicknameDialogOpen,
    changeNicknameTarget,
    openChangeNicknameDialog,
    closeChangeNicknameDialog,
    confirmChangeNickname,
  };
}

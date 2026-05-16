import { useState, useCallback, useMemo, useEffect } from "react";

export let GLOBAL_BANS = [
  { id: "101", username: "spammer123", name: "Spammer", reason: "Spamming in general chat" },
  { id: "102", username: "troll_master", name: "Troll Master", reason: "Harassing members" },
];

export function addBannedMember(member) {
  if (!GLOBAL_BANS.find(b => b.id === member.id)) {
    // Modify GLOBAL_BANS array
    GLOBAL_BANS = [...GLOBAL_BANS, { ...member, reason: "Banned by Admin" }];
  }
}

export function useBans({ serverName }) {
  const [bans, setBans] = useState(GLOBAL_BANS);
  const [searchQuery, setSearchQuery] = useState("");
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [revokeTarget, setRevokeTarget] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const filteredBans = useMemo(() => {
    if (!searchQuery) return bans;
    return bans.filter(b => 
      b.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [bans, searchQuery]);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  }, []);

  const openRevokeDialog = useCallback((b) => {
    setRevokeTarget(b);
    setRevokeDialogOpen(true);
  }, []);

  const closeRevokeDialog = useCallback(() => {
    setRevokeDialogOpen(false);
    setRevokeTarget(null);
  }, []);

  const confirmRevoke = useCallback(() => {
    if (revokeTarget) {
      setBans(prev => prev.filter(b => b.id !== revokeTarget.id));
      showToast("Ban revoked");
    }
    closeRevokeDialog();
  }, [revokeTarget, closeRevokeDialog, showToast]);

  // Sync back to GLOBAL_BANS
  useEffect(() => {
    GLOBAL_BANS = bans;
  }, [bans]);

  return {
    bans: filteredBans,
    searchQuery, setSearchQuery,
    revokeDialogOpen, revokeTarget, openRevokeDialog, closeRevokeDialog, confirmRevoke,
    toastMessage
  };
}

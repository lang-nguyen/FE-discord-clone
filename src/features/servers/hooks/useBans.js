import { useEffect, useMemo, useState } from "react";
import { getSettingsRepository } from "@/features/server-settings/repositories/getRepository";

export function useBans({ serverName }) {
  const repository = useMemo(() => getSettingsRepository("bans", serverName), [serverName]);
  const [bans, setBans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [revokeTarget, setRevokeTarget] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    repository.list().then(setBans);
  }, [repository]);

  const filteredBans = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return bans;
    return bans.filter(
      (ban) => ban.username.toLowerCase().includes(query) || ban.name.toLowerCase().includes(query)
    );
  }, [bans, searchQuery]);

  const closeRevokeDialog = () => setRevokeTarget(null);
  const confirmRevoke = async () => {
    if (!revokeTarget) return;
    await repository.remove(revokeTarget.id);
    setBans((current) => current.filter((ban) => ban.id !== revokeTarget.id));
    setRevokeTarget(null);
    setToastMessage("Ban revoked");
  };

  return {
    bans: filteredBans,
    searchQuery,
    setSearchQuery,
    revokeDialogOpen: Boolean(revokeTarget),
    revokeTarget,
    openRevokeDialog: setRevokeTarget,
    closeRevokeDialog,
    confirmRevoke,
    toastMessage,
  };
}

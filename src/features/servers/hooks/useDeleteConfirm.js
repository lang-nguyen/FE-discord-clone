import { useState } from "react";

export function useDeleteConfirm({ serverName, onDelete }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  const handleOpenChange = (open) => {
    if (!open) setConfirmName("");
    setDialogOpen(open);
  };

  const handleDelete = async () => {
    if (confirmName !== serverName) return;
    try {
      await onDelete();
      setDialogOpen(false);
      setConfirmName("");
    } catch {
      // The caller owns error presentation; keep the dialog open for retry.
    }
  };

  return {
    dialogOpen,
    confirmName,
    isMatch: confirmName === serverName,
    openDialog: () => setDialogOpen(true),
    setConfirmName,
    handleOpenChange,
    handleDelete,
  };
}

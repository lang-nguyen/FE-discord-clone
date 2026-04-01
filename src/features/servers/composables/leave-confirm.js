import { useState, useCallback } from "react";

export function useLeaveConfirm({ serverName, onLeave }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mở dialog
  const openDialog = useCallback(() => {
    setDialogOpen(true);
  }, []);

  // Đóng dialog
  const handleOpenChange = useCallback((open) => {
    setDialogOpen(open);
  }, []);

  // Thực hiện leave
  const handleLeave = useCallback(() => {
    onLeave();
    setDialogOpen(false);
  }, [onLeave]);

  return {
    dialogOpen,
    openDialog,
    handleOpenChange,
    handleLeave,
  };
}

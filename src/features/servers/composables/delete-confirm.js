import { useState, useCallback, useMemo } from "react";

/**
 * Composable quản lý xác nhận xóa server:
 * - Quản lý dialog open/close
 * - Quản lý confirm name input
 * - Validation tên server khớp
 * - Thực hiện xóa khi hợp lệ
 */
export function useDeleteConfirm({ serverName, onDelete }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  // Check tên nhập khớp với tên server
  const isMatch = useMemo(
    () => confirmName === serverName,
    [confirmName, serverName]
  );

  // Mở dialog
  const openDialog = useCallback(() => {
    setDialogOpen(true);
  }, []);

  // Đóng dialog + reset input
  const handleOpenChange = useCallback((open) => {
    if (!open) setConfirmName("");
    setDialogOpen(open);
  }, []);

  // Thực hiện xóa
  const handleDelete = useCallback(() => {
    if (confirmName !== serverName) return;
    onDelete();
    setDialogOpen(false);
    setConfirmName("");
  }, [confirmName, serverName, onDelete]);

  return {
    dialogOpen,
    confirmName,
    isMatch,
    openDialog,
    setConfirmName,
    handleOpenChange,
    handleDelete,
  };
}

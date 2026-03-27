import { useState, useRef, useCallback } from "react";

/**
 * Composable quản lý chọn & chỉnh sửa icon server:
 * - Mở file picker
 * - Quản lý editor dialog state (open/close)
 * - Apply ảnh đã crop
 * - Remove icon
 * - Cleanup blob URLs
 */
export function useServerIcon({ onIconChange }) {
  const fileInputRef = useRef(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [rawImageSrc, setRawImageSrc] = useState(null);

  // Mở file picker
  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Xử lý khi chọn file
  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setRawImageSrc(objectUrl);
    setEditorOpen(true);

    // Reset input để có thể chọn cùng file lần nữa
    e.target.value = "";
  }, []);

  // Apply ảnh đã crop từ editor
  const handleApply = useCallback(
    (croppedUrl) => {
      setRawImageSrc(null);
      onIconChange(croppedUrl);
    },
    [onIconChange]
  );

  // Xóa icon
  const handleRemove = useCallback(() => {
    onIconChange("");
  }, [onIconChange]);

  // Đóng editor dialog + cleanup blob URL
  const handleEditorClose = useCallback(
    (open) => {
      if (!open && rawImageSrc) {
        URL.revokeObjectURL(rawImageSrc);
        setRawImageSrc(null);
      }
      setEditorOpen(open);
    },
    [rawImageSrc]
  );

  return {
    fileInputRef,
    editorOpen,
    rawImageSrc,
    openFilePicker,
    handleFileSelect,
    handleApply,
    handleRemove,
    handleEditorClose,
  };
}

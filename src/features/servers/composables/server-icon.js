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

  // Apply ảnh đã crop từ editor (Nhận File từ dưới truyền lên)
  const handleApply = useCallback(
    async (croppedFile) => {
      setRawImageSrc(null);

      try {
        const formData = new FormData();
        formData.append("file", croppedFile);
        console.log("Đang gọi API upload file...", croppedFile);
        
        // Optimistically update the UI with the cropped image
        const objectUrl = URL.createObjectURL(croppedFile);
        onIconChange(objectUrl);
        setEditorOpen(false);
      } catch (error) {
        console.error("Lỗi khi upload ảnh lên server:", error);
      }
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

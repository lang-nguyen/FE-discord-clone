import { useState, useRef, useCallback } from "react";

/** Manages local server icon selection and preview state. */
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

  const handleApply = useCallback(
    (croppedFile) => {
      setRawImageSrc(null);
      const objectUrl = URL.createObjectURL(croppedFile);
      onIconChange(objectUrl);
      setEditorOpen(false);
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

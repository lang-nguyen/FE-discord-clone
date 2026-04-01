import { useState, useRef, useCallback, useMemo } from "react";

const DEFAULT_PROFILE_DATA = {
  serverName: "",
  description: "",
  isPrivate: true,
  selectedBanner: 0,
  avatarUrl: "",
  onlineCount: 5,
  membersCount: 10,
  establishedDate: "Oct 2025",
};

/**
 * Composable quản lý profile server:
 * - Quản lý state profile (serverName, description, banner, avatar, privacy...)
 * - Phát hiện thay đổi so với dữ liệu gốc (hasChanges)
 * - Reset về dữ liệu gốc
 * - Lưu profile (gọi API)
 * - Cập nhật từng field
 */
export function useServerProfile({ serverName }) {
  const initialData = useRef({
    ...DEFAULT_PROFILE_DATA,
    serverName: serverName || "",
  });

  const [profileData, setProfileData] = useState({
    ...initialData.current,
  });

  // So sánh field-by-field để detect thay đổi
  const hasChanges = useMemo(() => {
    const current = profileData;
    const initial = initialData.current;
    return (
      current.serverName !== initial.serverName ||
      current.description !== initial.description ||
      current.isPrivate !== initial.isPrivate ||
      current.selectedBanner !== initial.selectedBanner ||
      current.avatarUrl !== initial.avatarUrl
    );
  }, [profileData]);

  // Cập nhật 1 field cụ thể
  const updateField = useCallback((field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Reset về dữ liệu gốc
  const resetProfile = useCallback(() => {
    setProfileData({ ...initialData.current });
  }, []);

  // Lưu profile
  const saveProfile = useCallback(async () => {
    // TODO: Call API to save profile
    // await api.put(`/servers/${serverId}/profile`, profileData);

    // Sau khi save thành công → cập nhật initialData
    initialData.current = { ...profileData };
    // Force re-render để hasChanges = false
    setProfileData((prev) => ({ ...prev }));
  }, [profileData]);

  return {
    profileData,
    setProfileData,
    hasChanges,
    updateField,
    resetProfile,
    saveProfile,
  };
}

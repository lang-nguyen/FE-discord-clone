import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { serverApi } from "@/features/servers/api/server.api";

const DEFAULT_PROFILE_DATA = {
  serverName: "",
  description: "",
  isPrivate: true,
  selectedBanner: 0,
  avatarUrl: "",
  onlineCount: 0,
  membersCount: 0,
  establishedDate: "",
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

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch profile when serverName changes
  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      if (!serverName) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await serverApi.getProfile(serverName);
        if (isMounted && data) {
          const fetchedData = {
            ...DEFAULT_PROFILE_DATA,
            ...data,
            serverName: data.serverName || serverName, // Ensure serverName is present
          };
          initialData.current = fetchedData;
          setProfileData(fetchedData);
        }
      } catch (err) {
        console.error("Failed to fetch server profile", err);
        if (isMounted) setError("Failed to load server profile.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, [serverName]);

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
    setIsSaving(true);
    setError(null);
    try {
      await serverApi.updateProfile(serverName, profileData);
      // Sau khi save thành công → cập nhật initialData
      initialData.current = { ...profileData };
      // Force re-render để hasChanges = false bằng cách set lại state
      setProfileData((prev) => ({ ...prev }));
    } catch (err) {
      console.error("Failed to save server profile", err);
      setError("Failed to save server profile.");
    } finally {
      setIsSaving(false);
    }
  }, [profileData, serverName]);

  return {
    profileData,
    setProfileData,
    hasChanges,
    updateField,
    resetProfile,
    saveProfile,
    isLoading,
    isSaving,
    error,
  };
}

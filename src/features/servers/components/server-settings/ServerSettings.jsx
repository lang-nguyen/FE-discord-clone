import { useState, useRef } from "react";
import { ServerSettingLayout } from "./ServerSettingLayout";

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

export const ServerSettings = ({ serverName, onClose }) => {
  const [activeTab, setActiveTab] = useState("server-profile");

  const initialData = useRef({
    ...DEFAULT_PROFILE_DATA,
    serverName: serverName || "",
  });

  const [profileData, setProfileData] = useState({
    ...initialData.current,
  });

  // Check if any field has changed compared to initial data
  const hasChanges =
    profileData.serverName !== initialData.current.serverName ||
    profileData.description !== initialData.current.description ||
    profileData.isPrivate !== initialData.current.isPrivate ||
    profileData.selectedBanner !== initialData.current.selectedBanner ||
    profileData.avatarUrl !== initialData.current.avatarUrl;

  const handleReset = () => {
    setProfileData({ ...initialData.current });
  };

  const handleSave = () => {
    // Update initialData to current values after save
    initialData.current = { ...profileData };
    // Force re-render to hide the bar
    setProfileData({ ...profileData });
    // TODO: Call API to save
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#313338] overflow-y-auto">
      <ServerSettingLayout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClose={handleClose}
        serverName={profileData.serverName}
        profileData={profileData}
        onProfileChange={setProfileData}
        hasChanges={hasChanges}
        onReset={handleReset}
        onSave={handleSave}
      />
    </div>
  );
};

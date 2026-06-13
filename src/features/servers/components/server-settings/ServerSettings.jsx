import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServerSettingLayout } from "./ServerSettingLayout";
import { useServerProfile } from "@/features/servers/hooks/useServerProfile";
import { useDeleteConfirm } from "@/features/servers/hooks/useDeleteConfirm";
import { useDeleteServerMutation } from "@/features/servers/api/serversApi";
import { getErrorMessage } from "@/shared/api/error";
import { useToast } from "@/shared/ui/ToastProvider";

const VALID_TABS = ["server-profile", "members", "roles", "invites", "bans"];

export const ServerSettings = ({
  serverName: serverId,
  initialTab = "server-profile",
  onClose,
}) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState(
    VALID_TABS.includes(initialTab) ? initialTab : "server-profile"
  );
  const profile = useServerProfile(serverId);
  const [deleteServer] = useDeleteServerMutation();
  const deleteConfirm = useDeleteConfirm({
    serverName: profile.profileData.serverName,
    onDelete: async () => {
      try {
        await deleteServer(serverId).unwrap();
        navigate("/channels/@me", { replace: true });
      } catch (error) {
        showToast({
          title: "Unable to delete server",
          description: getErrorMessage(error),
          variant: "error",
        });
        throw error;
      }
    },
  });

  useEffect(() => {
    if (VALID_TABS.includes(initialTab)) setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/settings/server/${serverId}/${tab}`, { replace: true });
  };

  const handleSave = async () => {
    try {
      await profile.saveProfile();
      showToast({ title: "Server settings saved" });
    } catch (error) {
      showToast({
        title: "Unable to save server settings",
        description: getErrorMessage(error),
        variant: "error",
      });
    }
  };

  if (profile.isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-chat-bg text-primary-text flex items-center justify-center p-4">
        <p className="text-primary-text">Loading Server Profile...</p>
      </div>
    );
  }

  if (profile.error) {
    return (
      <div className="fixed inset-0 z-50 bg-chat-bg text-primary-text flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {getErrorMessage(profile.error, "Failed to load server profile.")}
          </p>
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
            onClick={onClose}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-chat-bg text-primary-text overflow-y-auto">
      <ServerSettingLayout
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onClose={onClose}
        serverId={serverId}
        serverName={profile.profileData.serverName}
        profileData={profile.profileData}
        onUpdateField={profile.updateField}
        hasChanges={profile.hasChanges}
        isSaving={profile.isSaving}
        onReset={profile.resetProfile}
        onSave={handleSave}
        deleteConfirm={deleteConfirm}
      />
    </div>
  );
};

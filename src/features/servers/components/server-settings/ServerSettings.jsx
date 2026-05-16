import { useState } from "react";
import { ServerSettingLayout } from "./ServerSettingLayout";
import { useServer } from "@/features/servers/composables/server";
import { useServerProfile } from "@/features/servers/composables/server-profile";
import { useDeleteConfirm } from "@/features/servers/composables/delete-confirm";

export const ServerSettings = ({ serverName, onClose }) => {
  const [activeTab, setActiveTab] = useState("server-profile");

  const server = useServer({ serverName, onClose });
  const profile = useServerProfile({ serverName });
  const deleteConfirm = useDeleteConfirm({
    serverName: profile.profileData.serverName,
    onDelete: server.deleteServer,
  });

  if (profile.isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#313338] flex items-center justify-center p-4">
        <p className="text-white">Loading Server Profile...</p>
      </div>
    );
  }

  if (profile.error) {
    return (
      <div className="fixed inset-0 z-50 bg-[#313338] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">{profile.error}</p>
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
    <div className="fixed inset-0 z-50 bg-[#313338] overflow-y-auto">
      <ServerSettingLayout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClose={onClose}
        serverName={profile.profileData.serverName}
        profileData={profile.profileData}
        onUpdateField={profile.updateField}
        hasChanges={profile.hasChanges}
        isSaving={profile.isSaving}
        onReset={profile.resetProfile}
        onSave={profile.saveProfile}
        deleteConfirm={deleteConfirm}
      />
    </div>
  );
};

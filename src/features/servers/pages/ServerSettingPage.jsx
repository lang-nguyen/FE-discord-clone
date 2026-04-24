import { useState } from "react";
import { ServerSettingLayout } from "@/features/servers/components/server-settings/ServerSettingLayout";
import { useServer } from "@/features/servers/composables/server";
import { useServerProfile } from "@/features/servers/composables/server-profile";
import { useDeleteConfirm } from "@/features/servers/composables/delete-confirm";

export const ServerSettingPage = ({ serverName, onClose }) => {
  const [activeTab, setActiveTab] = useState("server-profile");

  const server = useServer({ serverName, onClose });
  const profile = useServerProfile({ serverName });
  const deleteConfirm = useDeleteConfirm({
    serverName: profile.profileData.serverName,
    onDelete: server.deleteServer,
  });

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
        onReset={profile.resetProfile}
        onSave={profile.saveProfile}
        deleteConfirm={deleteConfirm}
      />
    </div>
  );
};

import { ServerProfile } from "./profile/ServerProfile";
import { ServerMembers } from "./members/ServerMember";
import { ServerRoles } from "./roles/ServerRoles";
import { ServerInvites } from "./invites/ServerInvites";

const TAB_COMPONENTS = {
  "server-profile": ServerProfile,
  "members": ServerMembers,
  "roles": ServerRoles,
  "invites": ServerInvites,
};

export const ContentArea = ({ activeTab, profileData, onUpdateField }) => {
  const Component = TAB_COMPONENTS[activeTab];

  if (!Component) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <h2 className="text-xl font-bold text-white mb-2">Coming Soon</h2>
        <p className="text-[#a3a6aa]">This settings page is not yet implemented.</p>
      </div>
    );
  }

  if (activeTab === "server-profile") {
    return <Component data={profileData} onUpdateField={onUpdateField} />;
  }

  if (activeTab === "members") {
    return <Component serverName={profileData.serverName} />;
  }

  if (activeTab === "invites") {
    return <Component serverId={profileData.id || "server-1"} />;
  }

  return <Component />;
};

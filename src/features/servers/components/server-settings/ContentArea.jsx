import { ServerProfile } from "./profile/ServerProfile";
import { ServerMembers } from "./members/ServerMember";
import { ServerRoles } from "./roles/ServerRoles";
import { ServerInvites } from "./invites/ServerInvites";
import { ServerBans } from "./bans/ServerBans";

const TAB_COMPONENTS = {
  "server-profile": ServerProfile,
  "members": ServerMembers,
  "roles": ServerRoles,
  "invites": ServerInvites,
  "bans": ServerBans,
};

export const ContentArea = ({ activeTab, serverId, profileData, onUpdateField }) => {
  const Component = TAB_COMPONENTS[activeTab];

  if (!Component) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <h2 className="text-xl font-bold text-primary-text mb-2">Coming Soon</h2>
        <p className="text-muted-text">This settings page is not yet implemented.</p>
      </div>
    );
  }

  if (activeTab === "server-profile") {
    return <Component data={profileData} onUpdateField={onUpdateField} />;
  }

  if (["members", "roles", "invites", "bans"].includes(activeTab)) {
    return <Component serverName={serverId} />;
  }

  return <Component />;
};

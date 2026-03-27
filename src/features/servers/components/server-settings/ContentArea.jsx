import { ServerProfile } from "./profile/ServerProfile";
import { ServerMembers } from "./members/ServerMember";

const TAB_COMPONENTS = {
  "server-profile": ServerProfile,
  "members": ServerMembers,
};

export const ContentArea = ({ activeTab, profileData, onUpdateField }) => {
  const Component = TAB_COMPONENTS[activeTab];

  if (!Component) return null;

  if (activeTab === "server-profile") {
    return <Component data={profileData} onUpdateField={onUpdateField} />;
  }

  if (activeTab === "members") {
    return <Component serverName={profileData.serverName} />;
  }

  return <Component />;
};

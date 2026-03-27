import { ServerProfile } from "./profile/ServerProfile";

const TAB_COMPONENTS = {
  "server-profile": ServerProfile
};

export const ContentArea = ({ activeTab, profileData, onProfileChange }) => {
  const Component = TAB_COMPONENTS[activeTab];

  if (!Component) return null;

  if (activeTab === "server-profile") {
    return <Component data={profileData} onChange={onProfileChange} />;
  }

  return <Component />;
};

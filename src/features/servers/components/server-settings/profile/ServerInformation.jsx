import { ServerNameField } from "./forms/ServerNameField";
import { ServerIconSection } from "./forms/ServerIconSection";
import { ServerBannerSelector } from "./forms/ServerBannerSelector";
import { ServerDescriptionField } from "./forms/ServerDescriptionField";
import { ServerPrivacyToggle } from "./forms/ServerPrivacyToggle";

export const ServerInformation = ({ data, onUpdateField }) => {
  return (
    <div className="flex-1 min-w-0 max-w-[520px]">
      <h2 className="text-xl font-semibold text-gray-200">Server Profile</h2>
      <p className="text-sm text-gray-400 mt-1 mb-8">
        Customise how your server appears in invite links and, if enabled, in
        Server Discovery and Announcement Channel messages
      </p>

      <ServerNameField
        value={data.serverName}
        onChange={(value) => onUpdateField("serverName", value)}
      />

      <div className="border-t border-[#3b3d44] my-6" />

      <ServerIconSection
        avatarUrl={data.avatarUrl}
        onChange={(value) => onUpdateField("avatarUrl", value)}
      />

      <div className="border-t border-[#3b3d44] my-6" />

      <ServerBannerSelector
        selectedBanner={data.selectedBanner}
        onChange={(value) => onUpdateField("selectedBanner", value)}
      />

      <div className="border-t border-[#3b3d44] my-6" />

      <ServerDescriptionField
        value={data.description}
        onChange={(value) => onUpdateField("description", value)}
      />

      <div className="border-t border-[#3b3d44] my-6" />

      <ServerPrivacyToggle
        isPrivate={data.isPrivate}
        onChange={(value) => onUpdateField("isPrivate", value)}
      />
    </div>
  );
};

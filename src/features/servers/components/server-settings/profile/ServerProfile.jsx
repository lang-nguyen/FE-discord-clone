import { ServerInformation } from "./ServerInformation";
import { ServerPreviewCard } from "./ServerPreviewCard";

export const ServerProfile = ({ data, onUpdateField }) => {
  return (
    <div className="flex gap-10">
      {/* Left Column — scrollable form */}
      <ServerInformation data={data} onUpdateField={onUpdateField} />

      {/* Right Column — sticky preview */}
      <ServerPreviewCard data={data} />
    </div>
  );
};

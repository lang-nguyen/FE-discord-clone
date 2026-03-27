import { ServerInformation } from "./ServerInformation";
import { ServerPreviewCard } from "./ServerPreviewCard";

export const ServerProfile = ({ data, onChange }) => {
  return (
    <div className="flex gap-10">
      {/* Left Column — scrollable form */}
      <ServerInformation data={data} onChange={onChange} />

      {/* Right Column — sticky preview */}
      <ServerPreviewCard data={data} />
    </div>
  );
};

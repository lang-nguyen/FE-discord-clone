import { ServerInformation } from "./ServerInformation";
import { ServerPreviewCard } from "./ServerPreviewCard";
import { ImageEditorDialog } from "@/shared/components/ui/ImageEditorDialog";
import { useServerIcon } from "@/features/servers/composables/server-icon";

export const ServerProfile = ({ data, onUpdateField }) => {
  const icon = useServerIcon({
    onIconChange: (value) => onUpdateField("avatarUrl", value),
  });

  return (
    <div className="flex gap-10 relative">
      {/* Left Column — scrollable form */}
      <ServerInformation 
        data={data} 
        onUpdateField={onUpdateField}
        onOpenIconPicker={icon.openFilePicker}
        onRemoveIcon={icon.handleRemove}
      />

      {/* Right Column — sticky preview */}
      <ServerPreviewCard 
        data={data} 
        onOpenIconPicker={icon.openFilePicker}
      />

      {/* Hidden file input */}
      <input
        ref={icon.fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={icon.handleFileSelect}
      />

      {/* Image editor dialog */}
      <ImageEditorDialog
        open={icon.editorOpen}
        onOpenChange={icon.handleEditorClose}
        imageSrc={icon.rawImageSrc}
        onApply={icon.handleApply}
      />
    </div>
  );
};

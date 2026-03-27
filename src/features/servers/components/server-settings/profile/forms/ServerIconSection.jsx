import { Button } from "@/shared/components/ui/Button";
import { ImageEditorDialog } from "@/shared/components/ui/ImageEditorDialog";
import { useServerIcon } from "@/features/servers/composables/server-icon";

export const ServerIconSection = ({ avatarUrl, serverName, onChange }) => {
  const icon = useServerIcon({ onIconChange: onChange });

  return (
    <div className="mb-6">
      <h3 className="text-xs font-bold uppercase tracking-wide text-gray-300 mb-1">
        Icon
      </h3>
      <p className="text-xs text-gray-500 mb-3">
        We recommend an image of at least 512x512.
      </p>

      <div className="flex items-center gap-3">
        <Button
          size="sm"
          variant="primary"
          onClick={icon.openFilePicker}
        >
          Change Server Icon
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-red-400 hover:text-red-300 hover:bg-transparent"
          onClick={icon.handleRemove}
        >
          Remove Icon
        </Button>
      </div>

      {/* Hidden file input */}
      <input
        id="server-icon-upload"
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

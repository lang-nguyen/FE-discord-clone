import { useRef, useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { ImageEditorDialog } from "@/shared/components/ui/ImageEditorDialog";

export const ServerIconSection = ({ avatarUrl, onChange }) => {
  const fileInputRef = useRef(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [rawImageSrc, setRawImageSrc] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setRawImageSrc(objectUrl);
    setEditorOpen(true);

    e.target.value = "";
  };

  const handleApply = (croppedUrl) => {
    setRawImageSrc(null);
    onChange(croppedUrl);
  };

  const handleRemove = () => {
    onChange("");
  };

  const handleEditorClose = (open) => {
    if (!open && rawImageSrc) {
      URL.revokeObjectURL(rawImageSrc);
      setRawImageSrc(null);
    }
    setEditorOpen(open);
  };

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
          onClick={() => fileInputRef.current?.click()}
        >
          Change Server Icon
        </Button>
        {avatarUrl && (
          <Button
            size="sm"
            variant="ghost"
            className="text-red-400 hover:text-red-300 hover:bg-transparent"
            onClick={handleRemove}
          >
            Remove Icon
          </Button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Image editor dialog */}
      <ImageEditorDialog
        open={editorOpen}
        onOpenChange={handleEditorClose}
        imageSrc={rawImageSrc}
        onApply={handleApply}
      />
    </div>
  );
};

import { Button } from "@/shared/components/ui/Button";

export const ServerIconSection = ({ onOpenIconPicker, onRemoveIcon }) => {
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
          onClick={onOpenIconPicker}
        >
          Change Server Icon
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-red-400 hover:text-red-300 hover:bg-transparent"
          onClick={onRemoveIcon}
        >
          Remove Icon
        </Button>
      </div>
    </div>
  );
};

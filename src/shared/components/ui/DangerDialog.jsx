import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/Dialog";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

export const DangerDialog = ({
  open,
  onOpenChange,
  title,
  description,
  inputLabel,
  inputValue,
  onInputValueChange,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isConfirmDisabled = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#313338] border-none max-w-[440px] p-0 gap-0 rounded-xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-5 pb-0">
          <DialogTitle className="text-white text-xl font-semibold select-none">
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="px-6 py-4">
          <div className="text-sm text-gray-400 leading-relaxed select-none">
            {description}
          </div>

          {inputLabel && (
            <div className="mt-5">
              <Input
                label={inputLabel}
                value={inputValue}
                onChange={(e) => onInputValueChange?.(e.target.value)}
                className="bg-[#1e1f22]"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 border-t border-[#3b3d44]/50 !flex !flex-row !justify-end gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white hover:bg-[#404249] rounded-md px-6"
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="bg-[#da373c] hover:bg-[#a12828] rounded-md px-6 disabled:opacity-50"
            onClick={onConfirm}
            disabled={isConfirmDisabled}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

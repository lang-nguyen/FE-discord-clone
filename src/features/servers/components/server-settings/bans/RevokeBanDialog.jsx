import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/Dialog";

export const RevokeBanDialog = ({ open, onOpenChange, targetBan, onConfirm }) => {
  if (!targetBan) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#313338] border-none text-gray-200 max-w-[440px] p-0 overflow-hidden shadow-xl rounded-lg">
        <div className="p-4">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold text-white mb-2">
              Revoke Ban
            </DialogTitle>
            <DialogDescription className="text-[15px] text-[#dbdee1] font-normal mt-0">
              Are you sure you want to revoke the ban for <strong>@{targetBan.username}</strong>? They will be able to join the server again.
            </DialogDescription>
          </DialogHeader>
        </div>

        <DialogFooter className="bg-[#2b2d31] p-4 flex gap-2 justify-end mt-0">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 text-sm font-medium text-white hover:underline rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#da373c] hover:bg-[#a12828] text-white text-sm font-medium rounded transition-colors"
          >
            Revoke Ban
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

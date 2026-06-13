import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/Dialog";
import { Button } from "@/shared/components/ui/Button";

export const KickMemberDialog = ({ 
  open, 
  onOpenChange, 
  targetMember, 
  onConfirm 
}) => {
  const [reason, setReason] = useState("");

  if (!open || !targetMember) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] bg-chat-bg text-primary-text border-none p-0 overflow-hidden gap-0 rounded-[8px] shadow-2xl">
        <DialogHeader className="p-4 pb-0 items-start text-left flex flex-row justify-between w-full">
          <DialogTitle className="text-[20px] font-bold text-white mb-2">
            Kick {targetMember.username} from Server
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 pt-2 space-y-4">
          <p className="text-[15px] text-primary-text/80 leading-snug">
            Are you sure you want to kick <span className="font-bold text-white">@{targetMember.username}</span> from the server? They will be able to rejoin again with a new invite.
          </p>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-white tracking-wide uppercase">Reason for Kick</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-server-sidebar-bg border border-[#1e1f22] text-[15px] text-primary-text rounded-[4px] p-3 h-[80px] resize-none focus:outline-none focus:border-black/50 font-medium"
            />
          </div>
        </div>

        <div className="p-4 flex gap-3 mt-4 bg-nav-sidebar-bg">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            className="flex-1 text-white bg-[#4e5058] hover:bg-[#6d6f78] h-[40px] rounded-[4px] font-medium transition-colors"
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => onConfirm(reason)} 
            className="flex-[1.2] text-white bg-[#da373c] hover:bg-[#a12828] h-[40px] rounded-[4px] font-medium transition-colors"
          >
            Kick
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

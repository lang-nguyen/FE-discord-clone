import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/Dialog";
import { Button } from "@/shared/components/ui/Button";

export const ChangeNicknameDialog = ({ 
  open, 
  onOpenChange, 
  member, 
  onConfirm 
}) => {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (open && member) {
      setNickname(member.name);
    }
  }, [open, member]);

  if (!open || !member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px] bg-[#313338] text-gray-200 border-none p-0 overflow-hidden gap-0 rounded-[8px] shadow-2xl">
        <DialogHeader className="p-4 pb-0 items-start text-left flex flex-row justify-between w-full">
          <DialogTitle className="text-[20px] font-bold text-white mb-2">
            Change Nickname
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 pt-2 space-y-4">
          <div className="bg-[#3b3121] rounded-[8px] p-4">
            <p className="text-[14px] text-gray-200 leading-snug">
              Nicknames are visible to everyone on this server. Do not change them unless you are enforcing a naming system or clearing a bad nickname.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-gray-200 uppercase tracking-wide">
              Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={member.name}
              className="w-full bg-[#1e1f22] border border-[#1e1f22] text-[15px] text-gray-200 rounded-[4px] px-3 h-10 focus:outline-none focus:border-black/50 font-medium"
            />
          </div>
        </div>

        <div className="p-4 flex gap-3 mt-4 bg-[#2b2d31]">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            className="flex-1 text-white bg-[#4e5058] hover:bg-[#6d6f78] h-[40px] rounded-[4px] font-medium transition-colors"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => onConfirm(nickname)} 
            className="flex-1 text-white bg-[#5865F2] hover:bg-[#4752c4] h-[40px] rounded-[4px] font-medium transition-colors"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

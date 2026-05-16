import { Dialog, DialogContent } from "@/shared/components/ui/Dialog";
import { Button } from "@/shared/components/ui/Button";
import { CheckCircle2, AlertTriangle, Ban } from "lucide-react";

export const BlockMemberDialog = ({ 
  open, 
  onOpenChange, 
  targetMember, 
  onConfirm 
}) => {
  if (!open || !targetMember) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] bg-[#313338] text-gray-200 border-none p-0 overflow-hidden gap-0 rounded-[8px] shadow-2xl">
        <div className="p-6 pt-8 pb-4 flex flex-col items-center text-center">
          {/* Avatar Icon */}
          <div className="relative mb-4">
            <div className="w-[64px] h-[64px] bg-[#5865F2] rounded-full flex items-center justify-center">
              {/* Discord Logo SVG */}
              <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.68,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.16,46,96.05,53,91,65.69,84.69,65.69Z"/>
              </svg>
            </div>
            {/* Block Overlay Icon */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#313338] rounded-full flex items-center justify-center">
              <Ban className="w-[18px] h-[18px] text-gray-400" />
            </div>
          </div>

          <h2 className="text-[22px] font-bold text-white mb-1">
            {targetMember.isBlocked ? `Unblock ${targetMember.username}?` : `Block ${targetMember.username}?`}
          </h2>
          <p className="text-[15px] font-medium text-white mb-6">
            {targetMember.isBlocked ? "They will be able to contact you and view your activity" : "Stop direct contact and limit what they view"}
          </p>

          <div className="w-full flex flex-col gap-5 text-left mb-6">
            {/* Item 1 */}
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[15px] font-bold text-white mb-0.5">Stop direct messages</h4>
                <p className="text-[13px] text-gray-400 leading-snug">You can unhide past messages if you want</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[15px] font-bold text-white mb-0.5">Limit access to your profile and activity</h4>
                <p className="text-[13px] text-gray-400 leading-snug">They won't see your mutual friends, bio, or status</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[15px] font-bold text-white mb-0.5">They can interact with you in GDMs and servers</h4>
                <p className="text-[13px] text-gray-400 leading-snug">If you join a voice channel they're active in, we'll let you know</p>
              </div>
            </div>
          </div>

          <a href="#" className="text-[14px] text-[#00a8fc] hover:underline font-medium mb-2">
            Explore feature guide
          </a>
        </div>

        <div className="p-4 flex gap-3 mt-auto bg-[#2b2d31]">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            className="flex-[1] text-white bg-[#4e5058] hover:bg-[#6d6f78] h-[40px] rounded-[4px] font-medium transition-colors"
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => onConfirm()} 
            className="flex-[1.2] text-white bg-[#da373c] hover:bg-[#a12828] h-[40px] rounded-[4px] font-medium transition-colors"
          >
            {targetMember.isBlocked ? "Unblock" : "Block"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

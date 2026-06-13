import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/Dialog";
import { Button } from "@/shared/components/ui/Button";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

export const EditInviteDialog = ({ open, onOpenChange, onGenerate }) => {
  const [tempMembership, setTempMembership] = useState(false);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] bg-chat-bg text-primary-text border-none p-0 overflow-hidden gap-0 rounded-[8px] shadow-2xl">
        <DialogHeader className="p-4 pb-0 items-start text-left flex flex-row justify-between w-full">
          <DialogTitle className="text-xl font-bold text-white mb-2">
            Server invite link settings
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 pt-2 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-primary-text/80 uppercase tracking-wide">Expire After</label>
            <div className="relative">
              <select
                className="w-full bg-server-sidebar-bg border border-[#1e1f22] hover:border-black/50 text-primary-text p-2.5 text-[15px] rounded-[4px] appearance-none cursor-pointer focus:outline-none focus:border-black/50 font-medium"
                defaultValue="7 days"
              >
                <option value="30 minutes" className="bg-nav-sidebar-bg">30 minutes</option>
                <option value="1 hour" className="bg-nav-sidebar-bg">1 hour</option>
                <option value="6 hours" className="bg-nav-sidebar-bg">6 hours</option>
                <option value="12 hours" className="bg-nav-sidebar-bg">12 hours</option>
                <option value="1 day" className="bg-nav-sidebar-bg">1 day</option>
                <option value="7 days" className="bg-nav-sidebar-bg">7 days</option>
                <option value="Never" className="bg-nav-sidebar-bg">Never</option>
              </select>
              <ChevronDown className="w-5 h-5 text-muted-text absolute right-3 top-[11px] pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-primary-text/80 uppercase tracking-wide">Max Number of Uses</label>
            <div className="relative">
              <select
                className="w-full bg-server-sidebar-bg border border-[#1e1f22] hover:border-black/50 text-primary-text p-2.5 text-[15px] rounded-[4px] appearance-none cursor-pointer focus:outline-none focus:border-black/50 font-medium"
                defaultValue="No limit"
              >
                <option value="No limit" className="bg-nav-sidebar-bg">No limit</option>
                <option value="1 use" className="bg-nav-sidebar-bg">1 use</option>
                <option value="5 uses" className="bg-nav-sidebar-bg">5 uses</option>
                <option value="10 uses" className="bg-nav-sidebar-bg">10 uses</option>
                <option value="25 uses" className="bg-nav-sidebar-bg">25 uses</option>
                <option value="50 uses" className="bg-nav-sidebar-bg">50 uses</option>
                <option value="100 uses" className="bg-nav-sidebar-bg">100 uses</option>
              </select>
              <ChevronDown className="w-5 h-5 text-muted-text absolute right-3 top-[11px] pointer-events-none" />
            </div>
          </div>

          <div className="flex items-start justify-between mt-2 pt-2">
            <div className="pr-4">
              <h4 className="text-[15px] font-bold text-white mb-1">Grant temporary membership</h4>
              <p className="text-[13px] text-muted-text leading-snug">Temporary members are automatically kicked when they disconnect unless a role has been assigned</p>
            </div>
            <button
              role="switch"
              aria-checked={tempMembership}
              onClick={() => setTempMembership(!tempMembership)}
              className={`w-10 h-6 shrink-0 rounded-full p-1 transition-colors focus-visible:outline-none mt-1 ${
                tempMembership ? "bg-[#23A559]" : "bg-[#80848E]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  tempMembership ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="p-4 flex gap-3 bg-nav-sidebar-bg mt-2">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            className="flex-1 text-white bg-[#4e5058] hover:bg-[#6d6f78] h-[44px] rounded-[4px] font-medium transition-colors"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              if (onGenerate) onGenerate();
              onOpenChange(false);
            }} 
            className="flex-[1.5] text-white bg-[#5865F2] hover:bg-hover-bg h-[44px] rounded-[4px] font-medium transition-colors"
          >
            Generate a New Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

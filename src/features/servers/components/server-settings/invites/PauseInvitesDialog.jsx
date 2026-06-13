import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/Dialog";
import { Button } from "@/shared/components/ui/Button";
import { ChevronDown, X } from "lucide-react";

export const PauseInvitesDialog = ({ open, onOpenChange, initialPaused, onSave }) => {
  const [pauseInvites, setPauseInvites] = useState(initialPaused || false);
  const [pauseDMs, setPauseDMs] = useState(false);

  useEffect(() => {
    if (open) {
      setPauseInvites(initialPaused || false);
    }
  }, [open, initialPaused]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] bg-chat-bg text-primary-text border-none p-0 overflow-hidden gap-0 rounded-[8px] shadow-2xl">
        <DialogHeader className="p-4 pb-0 items-start text-left flex flex-row justify-between w-full">
          <DialogTitle className="text-xl font-bold text-white">
            Security Actions
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 pt-4 space-y-4">
          <div className="relative">
            <select
              className="w-full bg-server-sidebar-bg border border-[#1e1f22] hover:border-black/50 text-primary-text p-2.5 text-[15px] rounded-[4px] appearance-none cursor-pointer focus:outline-none focus:border-black/50 font-medium"
              defaultValue="2 hours"
            >
              <option value="1 hour" className="bg-nav-sidebar-bg">1 hour</option>
              <option value="2 hours" className="bg-nav-sidebar-bg">2 hours</option>
              <option value="24 hours" className="bg-nav-sidebar-bg">24 hours</option>
              <option value="Until I turn it back on" className="bg-nav-sidebar-bg">Until I turn it back on</option>
            </select>
            <ChevronDown className="w-5 h-5 text-muted-text absolute right-3 top-[11px] pointer-events-none" />
          </div>

          <div className="bg-nav-sidebar-bg rounded-lg p-4 border border-[#1e1f22] flex items-start justify-between mt-4">
            <div className="pr-4">
              <h4 className="text-[15px] font-bold text-white mb-1">Pause Invites</h4>
              <p className="text-[13px] text-primary-text/80 leading-snug">Temporarily stop new members from joining this server via invite or vanity links.</p>
            </div>
            <button
              role="switch"
              aria-checked={pauseInvites}
              onClick={() => setPauseInvites(!pauseInvites)}
              className={`w-10 h-6 shrink-0 rounded-full p-1 transition-colors focus-visible:outline-none mt-1 ${
                pauseInvites ? "bg-[#23A559]" : "bg-[#80848E]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  pauseInvites ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="bg-nav-sidebar-bg rounded-lg p-4 border border-[#1e1f22] flex items-start justify-between">
            <div className="pr-4">
              <h4 className="text-[15px] font-bold text-white mb-1">Pause DMs</h4>
              <p className="text-[13px] text-primary-text/80 leading-snug">Temporarily stop new direct messages from being sent between members in your server. Friends can still DM each other, moderators can still DM members, and your Apps can still DM members.</p>
            </div>
            <button
              role="switch"
              aria-checked={pauseDMs}
              onClick={() => setPauseDMs(!pauseDMs)}
              className={`w-10 h-6 shrink-0 rounded-full p-1 transition-colors focus-visible:outline-none mt-1 ${
                pauseDMs ? "bg-[#23A559]" : "bg-[#80848E]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  pauseDMs ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="p-4 pt-1 flex gap-3 mt-2">
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
              if (onSave) onSave(pauseInvites);
              onOpenChange(false);
            }} 
            className="flex-1 text-white bg-[#5865F2] hover:bg-hover-bg h-[44px] rounded-[4px] font-medium transition-colors"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

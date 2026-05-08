import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/Dialog";
import { Button } from "@/shared/components/ui/Button";

const DURATIONS = [
  { label: "60 secs", value: "60s" },
  { label: "5 mins", value: "5m" },
  { label: "10 mins", value: "10m" },
  { label: "1 hour", value: "1h" },
  { label: "1 day", value: "1d" },
  { label: "1 week", value: "1w" }
];

export const TimeoutMemberDialog = ({ 
  open, 
  onOpenChange, 
  targetMember, 
  onConfirm 
}) => {
  const [duration, setDuration] = useState("60s");
  const [reason, setReason] = useState("");

  if (!open || !targetMember) return null;

  const isRemoving = targetMember.isTimeout;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px] bg-[#313338] text-gray-200 border-none p-0 overflow-hidden gap-0 rounded-[8px] shadow-2xl">
        <DialogHeader className="p-4 pb-0 items-start text-left flex flex-row justify-between w-full">
          <DialogTitle className="text-[20px] font-bold text-white mb-2">
            {isRemoving ? "Remove Timeout" : `Timeout ${targetMember.username}`}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 pt-2 space-y-6">
          {isRemoving ? (
            <>
              <p className="text-[15px] text-gray-300 leading-snug">
                {targetMember.username} has <span className="font-bold text-white">00h 00m 45s</span> remaining in timeout.
              </p>
              <p className="text-[15px] text-gray-300 leading-snug">
                Remove it now to let them post and react to messages, and join voice and stage channels.{" "}
                <a href="#" className="text-[#00a8fc] hover:underline">Learn More</a>
              </p>
            </>
          ) : (
            <>
              <p className="text-[14px] text-gray-300 leading-snug">
                Members who are in timeout are temporarily not allowed to chat or react in text channels. They are also not allowed to connect to voice or Stage channels.{" "}
                <a href="#" className="text-[#00a8fc] hover:underline">Learn more.</a>
              </p>

              <div className="space-y-2">
                <label className="text-xs font-bold text-white tracking-wide">Duration</label>
                <div className="flex bg-[#1e1f22] rounded-[4px] overflow-hidden border border-[#1e1f22]">
                  {DURATIONS.map((dur, index) => (
                    <button
                      key={dur.value}
                      onClick={() => setDuration(dur.value)}
                      className={`flex-1 py-2 text-[13px] font-medium transition-colors ${
                        duration === dur.value 
                          ? "bg-[#5865F2] text-white" 
                          : "bg-transparent text-gray-300 hover:bg-[#35373c] hover:text-white"
                      } ${index !== 0 ? "border-l border-[#2b2d31]" : ""}`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-white tracking-wide">Reason</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter a reason. This will only be visible in the Audit Log and will not be shown to the member."
                  className="w-full bg-[#1e1f22] border border-[#1e1f22] text-[15px] text-gray-200 rounded-[4px] p-3 h-[80px] resize-none focus:outline-none focus:border-black/50 font-medium placeholder:text-gray-500 leading-snug"
                />
              </div>
            </>
          )}
        </div>

        <div className="p-4 flex gap-3 mt-2 bg-[#2b2d31]">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            className="flex-[1] text-white bg-[#4e5058] hover:bg-[#6d6f78] h-[40px] rounded-[4px] font-medium transition-colors"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => onConfirm(duration, reason)} 
            className={`flex-[1.5] text-white h-[40px] rounded-[4px] font-medium transition-colors ${
              isRemoving ? "bg-[#da373c] hover:bg-[#a12828]" : "bg-[#5865F2] hover:bg-[#4752c4]"
            }`}
          >
            {isRemoving ? "Remove Timeout" : "Timeout"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

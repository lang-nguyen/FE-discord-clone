import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/Dialog";
import { Button } from "@/shared/components/ui/Button";
import { ChevronDown } from "lucide-react";

export const PruneMembersDialog = ({
  open,
  onOpenChange,
  serverName,
  onConfirm,
  members = [],
  roles = [],
}) => {
  const [days, setDays] = useState("7");
  const [role, setRole] = useState("");

  if (!open) return null;

  // Tính toán số lượng member sẽ bị kick (dựa theo logic kết hợp Role)
  const cutoffTs = Date.now() - (parseInt(days) * 86400000);
  const kickCount = members.filter(m => {
    if (m.lastSeenTs >= cutoffTs) return false;
    const hasNoRoles = m.roles.length === 0;
    const hasSelectedRole = role ? m.roles.includes(role) : false;
    return hasNoRoles || hasSelectedRole;
  }).length;
  
  const formattedRoleName = role ? roles.find(r => r.id === role)?.name : '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] bg-chat-bg text-primary-text border-none p-0 overflow-visible gap-0 rounded-[8px] shadow-2xl">
        <DialogHeader className="p-4 pb-0 items-start text-left">
          <DialogTitle className="text-xl font-bold text-white pr-6">
            Prune Members—{serverName}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 pt-6 space-y-6">
          {/* Last Seen Radio Buttons */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-primary-text uppercase tracking-wide">Last Seen</h3>
            <div className="space-y-3">
              {[
                { id: "7", label: "more than 7 days ago" },
                { id: "30", label: "more than 30 days ago" }
              ].map((opt) => (
                <label 
                  key={opt.id} 
                  className="flex items-center gap-3 cursor-pointer group select-none"
                  onClick={() => setDays(opt.id)}
                >
                  <div 
                    className={`w-5 h-5 box-border rounded-full flex items-center justify-center transition-colors ${
                      days === opt.id 
                        ? 'border-[6px] border-[#5865F2] bg-white' 
                        : 'border border-gray-500 group-hover:border-gray-400 bg-transparent'
                    }`}
                  />
                  <span className="text-[15px] text-primary-text leading-none">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Roles dropdown native select */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-primary-text uppercase tracking-wide">Also include members with these roles</h3>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-server-sidebar-bg border border-transparent hover:border-black/50 text-muted-text p-2.5 text-[15px] rounded appearance-none cursor-pointer focus:outline-none focus:border-black/50"
              >
                <option value="">Select...</option>
                {roles.map(r => (
                  <option key={r.id} value={r.id} className="text-primary-text bg-nav-sidebar-bg">{r.name}</option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 text-muted-text absolute right-3 top-[10px] pointer-events-none" />
            </div>
          </div>

          {/* Info Text */}
          <p className="text-sm text-primary-text/80 leading-relaxed bg-nav-sidebar-bg">
            Pruning will kick <span className="font-bold text-white">{kickCount} members</span> who have not been seen on Discord in <span className="font-bold text-white">{days} days</span> and are {role ? <span>assigned to <span className="font-bold text-white">{formattedRoleName}</span> or no roles</span> : 'not assigned to any roles'}. They can rejoin the server using a new invite.
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 pt-1 flex gap-3 mt-4">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            className="flex-1 text-white bg-[#4e5058] hover:bg-[#6d6f78] h-[44px] rounded-[4px] font-medium transition-colors"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => onConfirm(days, role)} 
            className="flex-1 text-white bg-[#5865F2] hover:bg-hover-bg h-[44px] rounded-[4px] font-medium transition-colors"
          >
            Prune
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

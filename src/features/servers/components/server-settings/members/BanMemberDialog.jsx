import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/Dialog";
import { Button } from "@/shared/components/ui/Button";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

export const BanMemberDialog = ({
  open,
  onOpenChange,
  targetMember,
  onConfirm,
}) => {
  const [reasonId, setReasonId] = useState("");
  const [deleteHistory, setDeleteHistory] = useState("1"); // Mặc định là 'Previous Hour' theo hình
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (open) {
      setReasonId("");
      setDeleteHistory("1");
      setIsDropdownOpen(false);
    }
  }, [open]);

  // Click ra ngoài để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!targetMember) return null;

  const REASONS = [
    { id: "suspicious", label: "Suspicious or spam account" },
    { id: "hacked", label: "Compromised or hacked account" },
    { id: "rules", label: "Breaking server rules" },
    { id: "other", label: "Other" }
  ];

  const DELETE_OPTIONS = [
    { id: "0", label: "Don't Delete Any" },
    { id: "1", label: "Previous Hour" },
    { id: "6", label: "Previous 6 Hours" },
    { id: "12", label: "Previous 12 Hours" },
    { id: "24", label: "Previous 24 Hours" },
    { id: "72", label: "Previous 3 Days" },
    { id: "168", label: "Previous 7 Days" }
  ];

  const currentDeleteOption = DELETE_OPTIONS.find(o => o.id === deleteHistory);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] bg-chat-bg text-primary-text border-none p-0 overflow-visible gap-0 rounded-[8px] shadow-2xl">
        {/* Default Radix Close button will appear at top right automatically */}
        <DialogHeader className="p-4 pb-0 items-start text-left">
          <DialogTitle className="text-xl font-bold text-white pr-6">
            Ban @{targetMember.username}?
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 pt-6 space-y-6">
          {/* Lý do Ban (Radio Buttons) */}
          <div className="space-y-3">
            <label className="text-[12px] font-bold text-white flex items-center">
              Reason for Ban <span className="text-[#da373c] ml-1 text-sm">*</span>
            </label>
            <div className="space-y-3">
              {REASONS.map((r) => (
                <label 
                  key={r.id} 
                  className="flex items-center gap-3 cursor-pointer group select-none"
                  onClick={() => setReasonId(r.id)}
                >
                  <div 
                    className={`w-[22px] h-[22px] box-border rounded-full flex items-center justify-center transition-colors ${
                      reasonId === r.id 
                        ? 'border-[7px] border-[#5865F2] bg-white' 
                        : 'border border-gray-500 group-hover:border-gray-400 bg-transparent'
                    }`}
                  />
                  <span className="text-[15px] text-primary-text leading-none">{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Xoá lịch sử nhắn tin (Select tuỳ chỉnh) */}
          <div className="space-y-2 relative" ref={dropdownRef}>
            <label className="text-[12px] font-bold text-white tracking-wide">
              Delete Message History
            </label>
            <div 
              className={`w-full bg-server-sidebar-bg text-primary-text p-2.5 text-[15px] rounded flex items-center justify-between cursor-pointer border hover:bg-server-sidebar-bg transition-colors ${isDropdownOpen ? 'border-indigo-400' : 'border-transparent'}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{currentDeleteOption?.label}</span>
              {isDropdownOpen ? <ChevronUp className="w-5 h-5 text-muted-text" /> : <ChevronDown className="w-5 h-5 text-muted-text" />}
            </div>

            {/* Danh sách options dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-[100%] left-0 w-full mt-1 bg-nav-sidebar-bg rounded-lg shadow-xl border border-[#1e1f22] overflow-hidden z-50">
                <div className="max-h-[220px] overflow-y-auto py-1 custom-scrollbar">
                  {DELETE_OPTIONS.map((opt) => (
                    <div 
                      key={opt.id}
                      className={`px-3 py-2 mx-1 rounded-[4px] flex items-center justify-between cursor-pointer text-[15px] ${deleteHistory === opt.id ? 'bg-hover-bg text-white' : 'text-primary-text/80 hover:bg-hover-bg hover:text-white'}`}
                      onClick={() => {
                        setDeleteHistory(opt.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <span className={deleteHistory === opt.id ? "font-medium" : ""}>{opt.label}</span>
                      {deleteHistory === opt.id && <Check className="w-4 h-4 text-white" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 pt-1 flex gap-3 mt-4">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            className="flex-1 text-white bg-[#4e5058] hover:bg-[#6d6f78] h-[44px] rounded-[4px] font-medium"
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            disabled={!reasonId} 
            onClick={() => onConfirm(reasonId, deleteHistory)} 
            className="flex-1 text-white bg-[#da373c] hover:bg-[#a12828] h-[44px] rounded-[4px] disabled:opacity-50 disabled:hover:bg-[#da373c] font-medium"
          >
            Ban
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

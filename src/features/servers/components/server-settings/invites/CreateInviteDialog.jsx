import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/Dialog";
import { Avatar, AvatarImage } from "@/shared/components/ui/Avatar";
import { Search } from "lucide-react";
import { ScrollArea } from "@/shared/components/ui/ScrollArea";

export const CreateInviteDialog = ({
  open,
  onOpenChange,
  friends,
  searchQuery,
  onSearchChange,
  onEditClick
}) => {
  const [invited, setInvited] = useState({});
  const [copied, setCopied] = useState(false);

  const handleInvite = (id) => {
    setInvited(prev => ({ ...prev, [id]: true }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("https://discord.gg/c6mEsCjm");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] bg-chat-bg text-primary-text border-none p-0 overflow-hidden gap-0 rounded-[8px] shadow-2xl flex flex-col">
        <DialogHeader className="p-4 pb-2 items-start text-left flex flex-row justify-between w-full">
          <div>
            <DialogTitle className="text-xl font-bold text-white mb-1">
              Invite friends to "ABC" server
            </DialogTitle>
            <p className="text-sm text-muted-text">
              Recipients will land in <span className="font-semibold text-primary-text/80"># general</span>
            </p>
          </div>
        </DialogHeader>

        <div className="px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for friends"
              className="w-full bg-server-sidebar-bg text-sm text-primary-text rounded-[4px] pl-9 pr-3 py-2 h-9 focus:outline-none focus:ring-1 focus:ring-transparent placeholder:text-muted-text/70 border border-transparent"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-text" />
          </div>
        </div>

        <div className="border-t border-[#1e1f22]" />

        <ScrollArea className="h-[240px] px-2 py-2">
          {friends.length === 0 ? (
            <div className="text-center text-muted-text text-sm py-8">No friends found</div>
          ) : (
            friends.map(friend => (
              <div key={friend.id} className="flex items-center justify-between p-2 hover:bg-[#3f4147] rounded transition-colors group">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={friend.avatar} alt={friend.username} />
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-primary-text group-hover:text-white leading-none mb-1">{friend.displayName}</span>
                    <span className="text-xs text-muted-text leading-none">{friend.username}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleInvite(friend.id)}
                  disabled={invited[friend.id]}
                  className={`h-8 px-4 text-sm font-medium rounded-[4px] transition-colors border ${invited[friend.id]
                      ? "text-white bg-transparent border-[#4e5058] opacity-50 cursor-not-allowed"
                      : "text-white bg-transparent border-[#4e5058] hover:border-gray-400"
                    }`}
                >
                  {invited[friend.id] ? "Sent" : "Invite"}
                </button>
              </div>
            ))
          )}
        </ScrollArea>

        <div className="bg-nav-sidebar-bg p-4 flex flex-col gap-2 rounded-b-[8px]">
          <h4 className="text-xs font-bold text-primary-text uppercase">Or, send a server invite link to a friend</h4>
          <div className="relative flex items-center mt-1">
            <input
              readOnly
              value="https://discord.gg/c6mEsCjm"
              className="w-full bg-server-sidebar-bg border border-[#1e1f22] text-sm text-primary-text/80 rounded-[4px] pl-3 pr-[76px] h-10 focus:outline-none focus:border-black/50 font-medium"
            />
            <button
              onClick={handleCopy}
              className={`absolute right-1 top-1 bottom-1 px-4 text-sm font-medium text-white rounded-[4px] transition-colors ${copied ? "bg-[#23A559]" : "bg-[#5865F2] hover:bg-hover-bg"
                }`}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-muted-text mt-1">
            Your invite link expires in 7 days. <span onClick={onEditClick} className="text-[#00a8fc] cursor-pointer hover:underline">Edit invite link.</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

import { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "@/shared/components/ui/Avatar";
import { X } from "lucide-react";

const formatTime = (ms) => {
  if (ms <= 0) return "Expired";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  const pad = (n) => n.toString().padStart(2, '0');
  
  if (days > 0) {
    return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const CountdownTimer = ({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState(expiresAt - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(expiresAt - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  return <span>{formatTime(timeLeft)}</span>;
};

export const InvitesTable = ({ invites, onRevoke }) => {
  return (
    <div className="mt-8 flex flex-col">
      {/* Header */}
      {invites.length > 0 && (
        <div className="grid grid-cols-[220px_1fr_80px_180px_1fr] items-center py-2 border-b border-[#3b3d44] text-[12px] font-bold text-gray-400 uppercase tracking-wide">
          <div>Inviter</div>
          <div>Invite Code</div>
          <div>Uses</div>
          <div>Expires</div>
          <div>Roles</div>
        </div>
      )}

      {/* Body */}
      {invites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 mt-8">
          <svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-8">
            <path d="M50 80C50 65 65 50 85 50C95 40 115 35 135 40C155 30 185 35 200 50C215 50 230 65 230 80C230 95 215 110 200 110H50C35 110 20 95 20 80Z" fill="#2b2d31"/>
            <path d="M120 45L70 70L105 80L120 45Z" fill="#E3E5E8"/>
            <path d="M120 45L85 85L115 95L120 45Z" fill="#949BA4"/>
            <path d="M105 80L115 85L110 95L105 80Z" fill="#4E5058"/>
            <path d="M40 40H60V45H40V40Z" fill="#2b2d31"/>
            <path d="M150 20H170V25H150V20Z" fill="#2b2d31"/>
            <path d="M180 80H200V85H180V80Z" fill="#2b2d31"/>
          </svg>
          <h3 className="text-gray-400 font-bold text-[16px] uppercase tracking-wide mb-2">
            No Invites Yet
          </h3>
          <p className="text-gray-400 text-[15px] text-center max-w-[420px] leading-relaxed">
            Feeling aimless? Like a paper plane drifting through the skies? Get some friends in here by creating an invite link!
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {invites.map(invite => (
            <div key={invite.id} className="grid grid-cols-[220px_1fr_80px_180px_1fr] items-center py-4 border-b border-[#3b3d44]/50 hover:bg-[#35373c]/30 transition-colors group relative">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={invite.inviter.avatar} alt={invite.inviter.name} />
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-[15px] font-medium text-gray-200">{invite.inviter.name}</span>
                  <span className="text-[13px] text-gray-400 leading-tight">#{invite.channel}</span>
                </div>
              </div>
              <div className="text-[15px] text-gray-300 font-mono tracking-wide">{invite.code}</div>
              <div className="text-[15px] text-gray-300">{invite.uses}</div>
              <div className="text-[15px] text-gray-300 font-mono tracking-wide">
                <CountdownTimer expiresAt={invite.expiresAt} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[15px] text-gray-300">{invite.roles.length > 0 ? invite.roles.join(", ") : ""}</span>
                <button 
                  onClick={() => onRevoke(invite.id)}
                  className="p-2 opacity-0 group-hover:opacity-100 hover:text-[#da373c] text-gray-400 transition-all rounded-full hover:bg-[#da373c]/10 absolute right-2"
                  title="Revoke Invite"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

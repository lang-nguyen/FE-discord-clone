import { MemberContextMenu } from "./MemberContextMenu";
import { MemberAvatar } from "./MemberAvatar";
import { useState, useEffect } from "react";

export const MemberRow = ({
  member,
  onTransferOwnership,
  onBanMember,
  onChangeNickname,
  onBlockMember,
  onTimeoutMember,
  onKickMember,
}) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!member.isTimeout || !member.timeoutUntil) return;

    const updateTimer = () => {
      const diff = member.timeoutUntil - Date.now();
      if (diff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }
      const h = Math.floor(diff / 3600000).toString().padStart(2, "0");
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, "0");
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, "0");
      setTimeLeft(`${h}:${m}:${s}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [member.isTimeout, member.timeoutUntil]);

  return (
    <div className="grid grid-cols-[auto_1fr_120px_120px_120px_100px_100px_auto] items-center px-4 py-3 border-b border-black/10 hover:bg-hover-bg group transition-colors">
      {/* Checkbox */}
      <div className="w-5 flex items-center">
        <input type="checkbox" className="w-4 h-4 rounded bg-input-bg border-muted-text accent-[#5865f2] cursor-pointer" />
      </div>

      {/* Name & Avatar */}
      <div className="flex items-center gap-3 pr-4 overflow-hidden">
        <MemberAvatar
          member={member}
          className="w-8 h-8 rounded-full border border-server-sidebar-bg"
          fallbackClassName="text-xs"
        />
        <div className="min-w-0">
          <div className="text-sm font-medium text-primary-text truncate flex items-center gap-2">
            {member.name}
            {member.isTimeout && (
              <div className="relative group/timeout">
                <span className="bg-[#da373c]/20 text-[#da373c] text-[10px] font-bold px-1.5 py-[2px] rounded-sm uppercase tracking-wider cursor-help">
                  Timeout
                </span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-server-sidebar-bg text-primary-text text-[12px] font-semibold rounded-[4px] whitespace-nowrap shadow-2xl opacity-0 group-hover/timeout:opacity-100 transition-all duration-200 pointer-events-none z-[60] border border-black/10 scale-95 group-hover/timeout:scale-100">
                  Ends in {timeLeft}
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-server-sidebar-bg" />
                </div>
              </div>
            )}
            {member.isBlocked && (
              <span className="bg-[#da373c]/20 text-[#da373c] text-[10px] font-bold px-1.5 py-[2px] rounded-sm uppercase tracking-wider">
                Blocked
              </span>
            )}
          </div>
          <div className="text-[12px] text-muted-text truncate">{member.username}</div>
        </div>
      </div>

      {/* Added */}
      <div className="text-sm text-muted-text">{member.memberSince}</div>

      {/* Joined */}
      <div className="text-sm text-muted-text">{member.joinedDiscord}</div>

      {/* Join Method */}
      <div className="text-sm text-muted-text flex items-center gap-1.5 truncate pr-2">
        {member.joinMethod !== "Unknown" && (
          <svg className="w-3.5 h-3.5 text-muted-text shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
        <span className="truncate">{member.joinMethod}</span>
      </div>

      {/* Roles */}
      <div className="text-sm text-muted-text">
        {member.roles.length === 0 ? "-" : member.roles.length}
      </div>

      {/* Signals */}
      <div className="text-sm text-muted-text flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end w-8">
        <MemberContextMenu
          member={member}
          onTransferOwnership={onTransferOwnership}
          onBanMember={onBanMember}
          onChangeNickname={onChangeNickname}
          onBlockMember={onBlockMember}
          onTimeoutMember={onTimeoutMember}
          onKickMember={onKickMember}
        >
          <button className="w-8 h-8 rounded-full hover:bg-hover-bg flex items-center justify-center text-muted-text hover:text-primary-text transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 16a2 2 0 100 4 2 2 0 000-4zm0-6a2 2 0 100 4 2 2 0 000-4zm0-6a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </button>
        </MemberContextMenu>
      </div>
    </div>
  );
};

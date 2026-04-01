import { MemberContextMenu } from "./MemberContextMenu";
import { MemberAvatar } from "./MemberAvatar";

export const MemberRow = ({ member, onTransferOwnership, onKickMember }) => {
  return (
    <div className="grid grid-cols-[auto_1fr_120px_120px_120px_100px_100px_auto] items-center px-4 py-3 border-b border-[#3b3d44]/50 hover:bg-[#35373c] group transition-colors">
      {/* Checkbox */}
      <div className="w-5 flex items-center">
        <input type="checkbox" className="w-4 h-4 rounded bg-[#1e1f22] border-gray-500 accent-[#5865f2] cursor-pointer" />
      </div>

      {/* Name & Avatar */}
      <div className="flex items-center gap-3 pr-4 overflow-hidden">
        <MemberAvatar 
          member={member} 
          className="w-8 h-8 rounded-full border border-[#1e1f22]" 
          fallbackClassName="text-xs"
        />
        <div className="min-w-0">
          <div className="text-sm font-medium text-gray-200 truncate">{member.name}</div>
          <div className="text-[12px] text-gray-400 truncate">{member.username}</div>
        </div>
      </div>

      {/* Added */}
      <div className="text-sm text-gray-300">{member.memberSince}</div>

      {/* Joined */}
      <div className="text-sm text-gray-300">{member.joinedDiscord}</div>

      {/* Join Method */}
      <div className="text-sm text-gray-300 flex items-center gap-1.5 truncate pr-2">
        {member.joinMethod !== "Unknown" && (
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
        <span className="truncate">{member.joinMethod}</span>
      </div>

      {/* Roles */}
      <div className="text-sm text-gray-300">
        {member.roles.length === 0 ? "-" : member.roles.length}
      </div>

      {/* Signals */}
      <div className="text-sm text-gray-300 flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end w-8">
        <MemberContextMenu 
          member={member} 
          onTransferOwnership={onTransferOwnership}
          onKickMember={onKickMember}
        >
          <button className="w-8 h-8 rounded-full hover:bg-[#404249] flex items-center justify-center text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 16a2 2 0 100 4 2 2 0 000-4zm0-6a2 2 0 100 4 2 2 0 000-4zm0-6a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </button>
        </MemberContextMenu>
      </div>
    </div>
  );
};

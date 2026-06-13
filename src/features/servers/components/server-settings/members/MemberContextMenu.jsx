import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/components/ui/Dropdown";

export const MemberContextMenu = ({
  member,
  onTransferOwnership,
  onBanMember,
  onChangeNickname,
  onBlockMember,
  onTimeoutMember,
  onKickMember,
  children
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Message</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onChangeNickname(member)}>Change Nickname</DropdownMenuItem>
        <DropdownMenuItem className="text-red-400 focus:text-red-300" onClick={() => onBlockMember(member)}>
          {member.isBlocked ? "Unblock" : "Block"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>Open in Mod View</DropdownMenuItem>
        <DropdownMenuItem className="text-red-400 focus:text-red-300" onClick={() => onTimeoutMember(member)}>
          {member.isTimeout ? `Remove Timeout for ${member.username}` : `Timeout ${member.username}`}
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-400 focus:text-red-300" onClick={() => onKickMember(member)}>
          Kick {member.username}
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-400 focus:text-red-300" onClick={() => onBanMember(member)}>
          Ban {member.username}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onTransferOwnership(member)}>
          Transfer Ownership
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center justify-between">
          <span>Copy User ID</span>
          <svg className="w-4 h-4 text-muted-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H7.5m8.25 8.25H21m-3.375-3.375V3.75" />
          </svg>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

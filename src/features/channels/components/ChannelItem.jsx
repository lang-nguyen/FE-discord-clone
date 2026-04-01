import { Hash, Volume2, Lock, UserPlus, Settings, MessageSquare } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/shared/components/ui/Tooltip';

// helper: ActionTooltip
const ActionTooltip = ({ label, children }) => (
    <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
            {children}
        </TooltipTrigger>
        <TooltipContent side="top">
            <p>{label}</p>
        </TooltipContent>
    </Tooltip>
);

// helper: ChannelIcon
const ChannelIcon = ({ type, isActive, hasUnread, isPrivate }) => {
    const Icon = type === 'voice' ? Volume2 : Hash;
    return (
        <div className="relative mr-1.5 flex h-5 w-5 items-center justify-center">
            <Icon
                className={cn(
                    "flex-shrink-0 w-5 h-5",
                    isActive ? "text-[#F2F3F5]" : (hasUnread ? "text-white" : "text-gray-400 group-hover:text-gray-200")
                )}
            />
            {isPrivate && (
                <div className={cn(
                    "absolute -right-0.5 -top-0.5 rounded-sm p-[1px]",
                    isActive ? "bg-[#3F4147]" : "bg-[#2B2D31] group-hover:bg-[#35373C]"
                )}>
                    <Lock 
                        className={cn(
                            "w-2.5 h-2.5 fill-current",
                            isActive ? "text-[#F2F3F5]" : (hasUnread ? "text-white" : "text-gray-400 group-hover:text-gray-200")
                        )} 
                        strokeWidth={2}
                    />
                </div>
            )}
        </div>
    );
};

// helper: UserLimit
const UserLimit = ({ type, userLimit, present = 0 }) => {
    if (type !== 'voice' || userLimit <= 0) return null;
    return (
        <div className="flex items-center text-xs font-semibold group-hover:hidden text-gray-400 flex-shrink-0">
            <div className="flex items-center ml-1 text-[10px] font-bold rounded overflow-hidden">
                <span className="px-1.5 py-[2px] bg-[#2B2D31] text-gray-300">
                    {String(present).padStart(2, '0')}
                </span>
                <span className="px-1.5 py-[2px] bg-[#35373C] text-gray-400">
                    {String(userLimit).padStart(2, '0')}
                </span>
            </div>
        </div>
    );
};

// helper: ChannelActions
const ChannelActions = ({ 
    type,
    onOpenChat,
    onInviteToVoice,
    onEditChannel
}) => {
    return (
        <div className="hidden group-hover:flex items-center space-x-1 flex-shrink-0">
            {type === 'voice' && (
                <ActionTooltip label="Open Chat">
                    <button
                        aria-label="Open Chat"
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenChat?.();
                        }}
                        className="text-gray-400 hover:text-gray-200 transition-colors"
                    >
                        <MessageSquare className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}
            <ActionTooltip label={type === 'voice' ? "Invite to Voice" : "Invite People"}>
                <button
                    aria-label={type === 'voice' ? "Invite to Voice" : "Invite People"}
                    onClick={(e) => {
                        e.stopPropagation();
                        onInviteToVoice?.();
                    }}
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                    <UserPlus className="w-4 h-4" />
                </button>
            </ActionTooltip>
            <ActionTooltip label="Edit Channel">
                <button
                    aria-label="Edit Channel"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEditChannel?.();
                    }}
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                    <Settings className="w-4 h-4" />
                </button>
            </ActionTooltip>
        </div>
    );
};

const ChannelItem = ({
    type = 'text',
    name,
    isActive,
    hasUnread,
    isPrivate = false,
    userLimit = 0,
    present = 0,
    onChannelClick,
    onOpenChat,
    onInviteToVoice,
    onEditChannel
}) => {
    return (
        <div
            className={cn(
                "group relative flex items-center justify-between px-2 py-1.5 mx-2 rounded-md transition-colors",
                !isActive && "hover:bg-[#35373C]",
                isActive ? "bg-[#3F4147] text-[#F2F3F5]" : (hasUnread ? "text-white font-bold" : "text-gray-400 hover:text-gray-200")
            )}
        >
            <button
                onClick={onChannelClick}
                className="absolute inset-0 w-full h-full rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#5865F2] cursor-pointer"
                aria-label={name}
            />
            <div className="flex items-center flex-1 min-w-0 relative z-10 pointer-events-none">
                <ChannelIcon type={type} isActive={isActive} hasUnread={hasUnread} isPrivate={isPrivate} />
                <span className="truncate text-sm">{name}</span>
            </div>

            <div className="flex items-center ml-2 relative z-10 pointer-events-none">
                <UserLimit type={type} userLimit={userLimit} present={present} />
                <div className="pointer-events-auto">
                    <ChannelActions 
                        type={type}
                        onOpenChat={onOpenChat}
                        onInviteToVoice={onInviteToVoice}
                        onEditChannel={onEditChannel}
                    />
                </div>
            </div>
        </div>
    );
};

export { ChannelItem };
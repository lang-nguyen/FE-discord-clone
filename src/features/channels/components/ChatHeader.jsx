import { Hash, Users, Pin, Search, Inbox } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/shared/components/ui/Tooltip';

const HeaderAction = ({ icon: Icon, label }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button className="text-[#b5bac1] hover:text-[#dbdee1] transition-colors p-1">
        <Icon className="w-5 h-5" />
      </button>
    </TooltipTrigger>
    <TooltipContent side="bottom" className="bg-[#111214] text-white font-semibold border-none">
      {label}
    </TooltipContent>
  </Tooltip>
);

export function ChatHeader({ channelName }) {
  return (
    <div className="h-12 min-h-[48px] flex items-center px-4 border-b border-[#1F2023] shadow-sm">
      {/* Channel Info */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Hash className="w-5 h-5 text-[#80848E] flex-shrink-0" />
        <h2 className="text-[15px] font-semibold text-white truncate">
          {channelName}
        </h2>

        {/* Divider */}
        <div className="w-px h-6 bg-[#3F4147] mx-2 flex-shrink-0" />

        {/* Topic/description */}
        <p className="text-[13px] text-[#949BA4] truncate">
          Welcome to the channel!
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 ml-2 flex-shrink-0">
        <HeaderAction icon={Pin} label="Pinned Messages" />
        <HeaderAction icon={Users} label="Member List" />

        {/* Search Box */}
        <div className="relative ml-1">
          <input
            type="text"
            placeholder="Search"
            className="w-[140px] h-6 bg-[#1E1F22] text-[13px] text-gray-200 rounded px-1.5 focus:outline-none focus:w-[240px] transition-all placeholder:text-[#949BA4]"
          />
          <Search className="w-3.5 h-3.5 text-[#949BA4] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <HeaderAction icon={Inbox} label="Inbox" />
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Mic, MicOff, Headphones, VolumeX, Settings } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/shared/components/ui/Tooltip';

export function UserPanel({ user }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  return (
    <div className="h-[52px] bg-[#232428] flex items-center px-2 gap-1 border-t border-[#1E1F22]">
      {/* User Info */}
      <button className="flex items-center gap-2 flex-1 min-w-0 px-1 py-1 rounded hover:bg-[#35373c] transition-colors">
        {/* Avatar with status */}
        <div className="relative flex-shrink-0">
          <img
            src={user?.avatar || 'https://ui-avatars.com/api/?name=U'}
            alt={user?.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="absolute bottom-[-1px] right-[-1px] w-[14px] h-[14px] rounded-full bg-[#23A559] border-[3px] border-[#232428]" />
        </div>

        {/* Name & Status */}
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold text-white truncate leading-tight">
            {user?.username || 'User'}
          </div>
          <div className="text-[11px] text-[#a3a6aa] truncate leading-tight">
            Online
          </div>
        </div>
      </button>

      {/* Action Buttons */}
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded hover:bg-[#35373c] transition-colors",
                isMuted ? "text-[#ED4245]" : "text-[#b5bac1] hover:text-[#dbdee1]"
              )}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-[#111214] text-white font-semibold border-none">
            {isMuted ? 'Unmute' : 'Mute'}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsDeafened(!isDeafened)}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded hover:bg-[#35373c] transition-colors",
                isDeafened ? "text-[#ED4245]" : "text-[#b5bac1] hover:text-[#dbdee1]"
              )}
            >
              {isDeafened ? <VolumeX className="w-5 h-5" /> : <Headphones className="w-5 h-5" />}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-[#111214] text-white font-semibold border-none">
            {isDeafened ? 'Undeafen' : 'Deafen'}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="w-8 h-8 flex items-center justify-center rounded text-[#b5bac1] hover:text-[#dbdee1] hover:bg-[#35373c] transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-[#111214] text-white font-semibold border-none">
            User Settings
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

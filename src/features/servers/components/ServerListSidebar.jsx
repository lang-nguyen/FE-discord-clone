import { useSelector, useDispatch } from 'react-redux';
import { setActiveServer } from '@/store/slices/chatSlice';
import { cn } from '@/shared/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/shared/components/ui/Tooltip';
import { ScrollArea } from '@/shared/components/ui/ScrollArea';

const DiscordLogo = () => (
  <svg className="w-7 h-5" viewBox="0 0 28 20" fill="currentColor">
    <path d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.8233 0.935086 10.5929 0.462406 10.3418 0.000546461C8.49032 0.321414 6.68751 0.884448 4.97867 1.68231C1.36067 7.04587 0.386699 12.2725 0.876699 17.4233C2.85867 18.9033 4.79667 19.7933 6.70067 20.3733C7.27267 19.5733 7.78267 18.7233 8.22267 17.8333C7.37467 17.5133 6.55667 17.1233 5.78267 16.6633C5.99067 16.5133 6.19367 16.3583 6.39067 16.2033C10.7017 18.2083 15.3317 18.2083 19.6037 16.2033C19.8037 16.3633 20.0067 16.5183 20.2117 16.6633C19.4347 17.1263 18.6147 17.5163 17.7647 17.8383C18.2047 18.7283 18.7147 19.5783 19.2867 20.3783C21.1937 19.7983 23.1317 18.9083 25.1167 17.4283C25.6917 11.4483 24.2917 6.27171 23.0212 1.67671ZM8.68867 14.2733C7.47667 14.2733 6.48267 13.1633 6.48267 11.8133C6.48267 10.4633 7.45067 9.34331 8.68867 9.34331C9.92667 9.34331 10.9207 10.4633 10.8947 11.8133C10.8947 13.1633 9.92267 14.2733 8.68867 14.2733ZM19.3117 14.2733C18.0997 14.2733 17.1097 13.1633 17.1097 11.8133C17.1097 10.4633 18.0777 9.34331 19.3117 9.34331C20.5457 9.34331 21.5397 10.4633 21.5177 11.8133C21.5177 13.1633 20.5497 14.2733 19.3117 14.2733Z" />
  </svg>
);

export function ServerListSidebar() {
  const dispatch = useDispatch();
  const servers = useSelector(state => state.chat?.servers || []);
  const activeServerId = useSelector(state => state.chat?.activeServerId);

  return (
    <div className="w-[72px] bg-[#1E1F22] flex-shrink-0 flex flex-col items-center py-3 gap-2">
      {/* Discord Home Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "w-12 h-12 flex items-center justify-center transition-all duration-200",
              !activeServerId
                ? "bg-[#5865F2] text-white rounded-2xl"
                : "bg-[#313338] text-[#DCDDDE] rounded-[24px] hover:rounded-2xl hover:bg-[#5865F2] hover:text-white"
            )}
          >
            <DiscordLogo />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-[#111214] text-white font-semibold border-none shadow-xl">
          Direct Messages
        </TooltipContent>
      </Tooltip>

      {/* Separator */}
      <div className="w-8 h-[2px] bg-[#35363C] rounded-full" />

      {/* Server Icons */}
      <ScrollArea className="flex-1 w-full">
        <div className="flex flex-col items-center gap-2 px-3">
          {servers.map(server => {
            const isActive = activeServerId === server.id;
            return (
              <div key={server.id} className="relative group">
                {/* Active indicator pill */}
                <div className={cn(
                  "absolute left-[-4px] top-1/2 -translate-y-1/2 w-[4px] rounded-r-full bg-white transition-all duration-200",
                  isActive ? "h-10" : "h-0 group-hover:h-5"
                )} />

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => dispatch(setActiveServer(server.id))}
                      className={cn(
                        "w-12 h-12 overflow-hidden transition-all duration-200",
                        isActive
                          ? "rounded-2xl"
                          : "rounded-[24px] hover:rounded-2xl"
                      )}
                    >
                      <img
                        src={server.icon}
                        alt={server.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-[#111214] text-white font-semibold border-none shadow-xl">
                    {server.name}
                  </TooltipContent>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Separator */}
      <div className="w-8 h-[2px] bg-[#35363C] rounded-full" />

      {/* Add Server Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="w-12 h-12 flex items-center justify-center bg-[#313338] text-[#23A559] rounded-[24px] hover:rounded-2xl hover:bg-[#23A559] hover:text-white transition-all duration-200">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-[#111214] text-white font-semibold border-none shadow-xl">
          Add a Server
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

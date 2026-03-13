import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/Tooltip";

/**
 * ServerSidebarItem component
 * 
 * Props:
 * @param {string} id - Server unique ID
 * @param {string} name - Server name
 * @param {string} imageUrl - Server icon image URL
 * @param {boolean} isActive - Whether the server is currently selected
 * @param {boolean} hasNotification - Whether the server has unread messages
 * @param {number} mentionsCount - Number of mentions in the server
 */
const ServerSidebarItem = ({
  id,
  name,
  imageUrl,
  isActive,
  hasNotification,
  mentionsCount,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button className="group relative flex items-center mb-3 focus:outline-none">
            {/* Pill Indicator (Thanh trắng bên trái) */}
            <div
              className={cn(
                "absolute left-0 bg-white rounded-r-full transition-all duration-200 w-[4px]",
                isActive ? "h-[40px]" : hasNotification ? "h-[8px]" : "h-0",
                !isActive && "group-hover:h-[20px]"
              )}
            />

            {/* Server Icon Container & Shape Hover Effect */}
            <div
              className={cn(
                "relative flex mx-3 h-[48px] w-[48px] transition-all duration-200 overflow-visible",
                "bg-[#313338] text-white", // Default Discord background for icons
                isActive ? "rounded-[16px]" : "rounded-[50%] group-hover:rounded-[16px]"
              )}
            >
              {/* Icon Image or Initial */}
              <div className={cn(
                "w-full h-full overflow-hidden transition-all duration-200",
                isActive ? "rounded-[16px]" : "rounded-[50%] group-hover:rounded-[16px]"
              )}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full font-semibold">
                    {name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Badge (Mentions) */}
              {mentionsCount > 0 && (
                <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center border-[3px] border-[#1e1f22]">
                  {mentionsCount}
                </div>
              )}
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          className="ml-2 font-bold bg-black text-white border-none shadow-xl"
        >
          {name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ServerSidebarItem;

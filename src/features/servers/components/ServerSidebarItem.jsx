import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/Tooltip";

/**
 * ServerSidebarItem component
 */
const ServerSidebarItem = ({
  id,
  name,
  imageUrl,
  isActive,
  hasNotification,
  mentionsCount,
  onServerClick, // BƯỚC 3: Nhận cái hàm này từ ông nội App.jsx qua bố Sidebar
}) => {

  // 1. Tưởng tượng useState như một cái CÔNG TẮC ĐÈN (ON/OFF)
  const [isSeen, setIsSeen] = useState(false);

  // Hàm này bây giờ làm 2 việc: vừa đổi trạng thái "đã xem", vừa báo cho App.jsx biết tên server
  const handleClick = () => {
    setIsSeen(true);
    if (onServerClick) {
      onServerClick(id); // Báo cho MainLayout.jsx đổi activeServerId
    }
  };


  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          {/* 3. onClick={handleClick}: Khi bấm chuột vào nút này, nó sẽ gọi hàm ở trên */}
          <button 
            onClick={handleClick}
            className="group relative flex items-center mb-3 focus:outline-none"
          >
            {/* Thanh trắng bên trái */}
            <div
              className={cn(
                "absolute left-0 bg-primary-text rounded-r-full transition-all duration-200 w-[4px]",
                isActive ? "h-[40px]" : hasNotification ? "h-[8px]" : "h-0",
                !isActive && "group-hover:h-[20px]"
              )}
            />

            {/* Icon Server */}
            <div
              className={cn(
                "relative flex mx-3 h-[48px] w-[48px] transition-all duration-200 overflow-visible",
                "bg-chat-bg text-primary-text",
                isActive ? "rounded-[16px]" : "rounded-[50%] group-hover:rounded-[16px]"
              )}
            >
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

              {/* 4. CHỈ HIỆN BADGE NẾU (có tin nhắn) VÀ (chưa bấm vào - !isSeen) */}
              {mentionsCount > 0 && !isSeen && (
                <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center border-[3px] border-server-sidebar-bg">
                  {mentionsCount}
                </div>
              )}
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          className="ml-2 font-bold shadow-xl"
        >
          {name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ServerSidebarItem;

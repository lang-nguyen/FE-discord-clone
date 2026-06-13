import { cn } from "@/shared/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/Tooltip";

const HomeButton = ({ isActive, onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className="group relative flex items-center mb-3 focus:outline-none"
          >
            {/* Pill Indicator */}
            <div
              className={cn(
                "absolute left-0 bg-primary-text rounded-r-full transition-all duration-200 w-[4px]",
                isActive ? "h-[40px]" : "h-0",
                !isActive && "group-hover:h-[20px]"
              )}
            />

            {/* Icon Container */}
            <div
              className={cn(
                "relative flex mx-3 h-[48px] w-[48px] transition-all duration-200 overflow-hidden",
                "bg-chat-bg text-muted-text group-hover:bg-[#5865f2] group-hover:text-white",
                isActive
                  ? "rounded-[16px] bg-[#5865f2] text-white"
                  : "rounded-[50%] group-hover:rounded-[16px]"
              )}
            >
              <div className="flex items-center justify-center w-full h-full">
                <svg
                  width="28"
                  height="20"
                  viewBox="0 0 28 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.0212 1.67671C21.3107 0.883335 19.4641 0.291771 17.5366 0C17.2948 0.437566 17.0305 0.992454 16.8324 1.48827C14.7303 1.17094 12.6373 1.17094 10.5352 1.48827C10.3371 0.992454 10.0638 0.437566 9.82204 0C7.8945 0.291771 6.04785 0.883335 4.33735 1.67671C0.843909 6.94563 -0.112166 12.0841 0.0382343 17.1528C2.3551 18.8929 4.59609 19.9538 6.79153 20C7.34091 19.2435 7.83061 18.4357 8.24647 17.579C7.45612 17.2759 6.70321 16.9016 5.9961 16.4571C6.18375 16.3195 6.36647 16.1732 6.54141 16.0211C10.9329 18.0694 15.7483 18.0694 20.0818 16.0211C20.2568 16.1732 20.4395 16.3195 20.6271 16.4571C19.92 16.9016 19.1671 17.2759 18.3768 17.579C18.7926 18.4357 19.2823 19.2435 19.8317 20C22.0271 19.9538 24.2681 18.8929 26.585 17.1528C26.775 11.5034 25.176 6.44391 23.0212 1.67671ZM9.68041 13.6384C8.36942 13.6384 7.2952 12.4184 7.2952 10.9329C7.2952 9.44738 8.35147 8.22738 9.68041 8.22738C11.0183 8.22738 12.0835 9.44738 12.0655 10.9329C12.0655 12.4184 11.0093 13.6384 9.68041 13.6384ZM17.1824 13.6384C15.8714 13.6384 14.7972 12.4184 14.7972 10.9329C14.7972 9.44738 15.8535 8.22738 17.1824 8.22738C18.5203 8.22738 19.5855 9.44738 19.5675 10.9329C19.5675 12.4184 18.5113 13.6384 17.1824 13.6384Z" />
                </svg>
              </div>
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" align="center" className="ml-2 font-bold shadow-xl">
          Direct Messages
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HomeButton;

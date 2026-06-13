import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/Tooltip";
import { Plus, Compass } from "lucide-react";

const ActionButton = ({ type, name, onClick }) => {

  const isAdd = type === "add";
  const Icon = isAdd ? Plus : Compass;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button 
            onClick={onClick}
            className="group relative flex items-center mb-3 focus:outline-none"
          >

            {/* Pill Indicator (Optional for action buttons, but Discord sometimes uses a small one) */}
            <div className="absolute left-0 bg-white rounded-r-full transition-all duration-200 w-[4px] h-0 group-hover:h-[20px]" />

            {/* Icon Container */}
            <div
              className={cn(
                "relative flex mx-3 h-[48px] w-[48px] transition-all duration-200 overflow-hidden",
                "bg-[#313338] text-[#23a559] group-hover:bg-[#23a559] group-hover:text-white",
                "rounded-[50%] group-hover:rounded-[16px]"
              )}
            >
              <div className="flex items-center justify-center w-full h-full">
                <Icon size={25} />
              </div>
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

export default ActionButton;

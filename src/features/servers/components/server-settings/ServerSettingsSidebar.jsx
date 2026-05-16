import { cn } from "@/shared/lib/utils";
import { ScrollArea } from "@/shared/components/ui/ScrollArea";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/shared/components/ui/Tooltip";

const SIDEBAR_SECTIONS = [
  {
    label: null,
    serverName: true,
    items: [{ id: "server-profile", name: "Server Profile" }],
  },
  {
    label: "PEOPLE",
    items: [
      { id: "members", name: "Members" },
      { id: "roles", name: "Roles" },
      { id: "invites", name: "Invites" },
      { id: "bans", name: "Bans" },
    ],
  }
];

const BOTTOM_ITEMS = [
  { id: "server-template", name: "Server Template" },
];

function SidebarItem({ item, isActive, onClick }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => onClick(item.id)}
          className={cn(
            "w-full text-left px-2.5 py-1.5 rounded text-sm transition-colors flex items-center justify-between group",
            isActive
              ? "bg-[#43444b] text-white"
              : "text-gray-400 hover:text-gray-200 hover:bg-[#35373c]"
          )}
        >
          <span className="truncate">{item.name}</span>
          {item.hasExternalLink && (
            <svg
              className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-400 transition-colors shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">
        {item.name}
      </TooltipContent>
    </Tooltip>
  );
}

export function ServerSettingsSidebar({
  activeTab,
  onTabChange,
  serverName = "Server Name",
  onDeleteServer,
}) {
  return (
    <TooltipProvider>
      <nav className="shrink-0 flex flex-col pr-1.5">
        <ScrollArea className="flex-1 py-[60px] pl-5 pr-1.5">
          <div className="flex flex-col gap-0.5">
            {SIDEBAR_SECTIONS.map((section, sectionIdx) => (
              <div key={sectionIdx} className={cn(sectionIdx > 0 && "mt-2")}>
                {/* Section label */}
                {section.serverName ? (
                  <div className="px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide text-gray-500 truncate">
                    {serverName}
                  </div>
                ) : (
                  section.label && (
                    <div className="px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide text-gray-500">
                      {section.label}
                    </div>
                  )
                )}

                {/* Section items */}
                <div className="flex flex-col gap-0.5">
                  {section.items.map((item) => (
                    <SidebarItem
                      key={item.id}
                      item={item}
                      isActive={activeTab === item.id}
                      onClick={onTabChange}
                    />
                  ))}
                </div>

                {/* Separator after section */}
                {sectionIdx < SIDEBAR_SECTIONS.length - 1 && (
                  <div className="mx-2.5 mt-2 border-b border-[#3b3d44]" />
                )}
              </div>
            ))}

            {/* Separator before bottom items */}
            <div className="mx-2.5 mt-2 border-b border-[#3b3d44]" />

            {/* Bottom items */}
            <div className="flex flex-col gap-0.5 mt-2">
              {BOTTOM_ITEMS.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  isActive={activeTab === item.id}
                  onClick={onTabChange}
                />
              ))}
            </div>

            {/* Delete Server */}
            <div className="mx-2.5 mt-2 border-b border-[#3b3d44]" />
            <div className="mt-2">
              <button
                onClick={onDeleteServer}
                className="w-full text-left px-2.5 py-1.5 rounded text-sm transition-colors flex items-center justify-between group text-red-400 hover:text-red-300 hover:bg-[#35373c]"
              >
                <span>Delete Server</span>
                <svg
                  className="w-4 h-4 text-red-400 group-hover:text-red-300 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </ScrollArea>
      </nav>
    </TooltipProvider>
  );
}


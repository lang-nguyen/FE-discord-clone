import { ServerSettingsSidebar } from "./ServerSettingsSidebar";
import { ContentArea } from "./ContentArea";
import { ScrollArea } from "@/shared/components/ui/ScrollArea";
import { UnsavedChangesBar } from "./UnsavedChangesBar";

export function ServerSettingLayout({
  activeTab,
  onTabChange,
  onClose,
  serverName,
  profileData,
  onProfileChange,
  hasChanges,
  onReset,
  onSave,
}) {
  return (
    <div className="h-screen flex bg-[#2b2d31] relative">
      {/* LEFT SPACE (center layout) */}
      <div className="w-[20%]" />

      {/* SIDEBAR */}
      <div className="w-[35%] max-w-[260px] min-w-[200px] bg-[#2b2d31] overflow-y-auto">
        <ServerSettingsSidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          serverName={serverName}
        />
      </div>

      <ScrollArea className="flex-1 h-screen">
        <div className="max-w-[740px] py-[60px] px-10">
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="fixed top-15 right-6 group flex flex-col items-center gap-1"
          >
            <div className="w-9 h-9 rounded-full border-2 border-gray-500 flex items-center justify-center group-hover:border-white transition-colors">
              <svg
                className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <span className="text-[12px] font-semibold text-gray-500 group-hover:text-white tracking-wide">
              ESC
            </span>
          </button>
          <div className="w-full">
            <ContentArea
              activeTab={activeTab}
              profileData={profileData}
              onProfileChange={onProfileChange}
            />
          </div>
        </div>
      </ScrollArea>

      {/* Unsaved changes bar */}
      {hasChanges && (
        <UnsavedChangesBar onReset={onReset} onSave={onSave} />
      )}
    </div>
  );
}

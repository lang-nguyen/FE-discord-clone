import { ServerSettingsSidebar } from "./ServerSettingsSidebar";
import { ContentArea } from "./ContentArea";
import { UnsavedChangesBar } from "./UnsavedChangesBar";
import { DeleteServerDialog } from "./delete/DeleteServerDialog";

export function ServerSettingLayout({
  activeTab,
  onTabChange,
  onClose,
  serverId,
  serverName,
  profileData,
  onUpdateField,
  hasChanges,
  isSaving,
  onReset,
  onSave,
  deleteConfirm,
}) {
  return (
    <div className="h-screen flex bg-chat-bg text-primary-text relative">
      {/* LEFT SPACE (center layout) */}
      <div className="w-[20%]" />

      {/* SIDEBAR */}
      <div className="w-[35%] max-w-[260px] min-w-[200px] bg-nav-sidebar-bg overflow-y-auto">
        <ServerSettingsSidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          serverName={serverName}
          onDeleteServer={deleteConfirm.openDialog}
        />
      </div>

      {/* CONTENT AREA: flex-col, overflow-hidden để header con có thể sticky được */}
      <div className="flex-1 h-screen flex flex-col overflow-hidden relative">
        {/* Nút Close cố định góc phải */}
        <button
          onClick={onClose}
          className="fixed top-[60px] right-6 group flex flex-col items-center gap-1 z-20"
        >
          <div className="w-9 h-9 rounded-full border-2 border-muted-text flex items-center justify-center group-hover:border-primary-text transition-colors">
            <svg
              className="w-5 h-5 text-muted-text group-hover:text-primary-text transition-colors"
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
          <span className="text-[12px] font-semibold text-muted-text group-hover:text-primary-text tracking-wide">
            ESC
          </span>
        </button>

        {/* ContentArea tự quản lý scroll bên trong */}
        <div className="flex-1 overflow-y-auto">
          <div
            className={`py-[60px] px-10 ${activeTab === "members" ? "max-w-[1024px]" : "max-w-[740px]"
              }`}
          >
            <ContentArea
              activeTab={activeTab}
              serverId={serverId}
              profileData={profileData}
              onUpdateField={onUpdateField}
            />
          </div>
        </div>
      </div>

      {/* Unsaved changes bar */}
      {hasChanges && (
        <UnsavedChangesBar onReset={onReset} onSave={onSave} isSaving={isSaving} />
      )}

      {/* Delete server dialog */}
      <DeleteServerDialog
        open={deleteConfirm.dialogOpen}
        onOpenChange={deleteConfirm.handleOpenChange}
        serverName={serverName}
        confirmName={deleteConfirm.confirmName}
        onConfirmNameChange={deleteConfirm.setConfirmName}
        isMatch={deleteConfirm.isMatch}
        onDelete={deleteConfirm.handleDelete}
      />
    </div>
  );
}

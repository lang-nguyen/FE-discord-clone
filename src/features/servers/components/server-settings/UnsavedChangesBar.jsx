import { Button } from "@/shared/components/ui/Button";

export const UnsavedChangesBar = ({ onReset, onSave, isSaving }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none animate-slide-up">
      <div className="mb-6 mx-4 w-full max-w-[740px] pointer-events-auto">
        <div className="flex items-center justify-between rounded-md bg-user-panel-bg px-4 py-3 shadow-lg border border-server-sidebar-bg">
          <p className="text-sm text-primary-text font-medium">
            Careful — you have unsaved changes!
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onReset}
              disabled={isSaving}
              className={`text-sm text-muted-text hover:text-primary-text font-medium transition-colors px-2 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Reset
            </button>
            <Button
              size="sm"
              disabled={isSaving}
              className={`bg-[#248045] hover:bg-[#1a6334] text-white px-6 flex-shrink-0 min-w-[130px] ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
              onClick={onSave}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

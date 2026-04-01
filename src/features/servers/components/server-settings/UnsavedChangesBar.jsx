import { Button } from "@/shared/components/ui/Button";

export const UnsavedChangesBar = ({ onReset, onSave }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none animate-slide-up">
      <div className="mb-6 mx-4 w-full max-w-[740px] pointer-events-auto">
        <div className="flex items-center justify-between rounded-md bg-[#111214] px-4 py-3 shadow-lg border border-[#1e1f22]">
          <p className="text-sm text-gray-200 font-medium">
            Careful — you have unsaved changes!
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onReset}
              className="text-sm text-gray-300 hover:text-white font-medium transition-colors px-2"
            >
              Reset
            </button>
            <Button
              size="sm"
              className="bg-[#248045] hover:bg-[#1a6334] text-white px-6"
              onClick={onSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

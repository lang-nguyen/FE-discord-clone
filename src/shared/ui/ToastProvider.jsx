import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, description, variant = "default" }) => {
      const id = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
      setToasts((current) => [...current, { id, title, description, variant }]);
      window.setTimeout(() => dismiss(id), 4000);
      return id;
    },
    [dismiss]
  );

  const value = useMemo(() => ({ showToast, dismiss }), [dismiss, showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-[200] flex w-[340px] max-w-[calc(100vw-2rem)] flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-md border p-4 shadow-2xl ${
              toast.variant === "error"
                ? "border-red-400/30 bg-red-950 text-red-50"
                : "border-black/20 bg-user-panel-bg text-primary-text"
            }`}
            role="status"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                {toast.title && <p className="text-sm font-semibold">{toast.title}</p>}
                {toast.description && (
                  <p className="mt-1 text-xs opacity-80">{toast.description}</p>
                )}
              </div>
              <button type="button" onClick={() => dismiss(toast.id)} aria-label="Dismiss">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "@/app/store/store";
import { SocketProvider } from "@/shared/providers/SocketProvider";
import { ThemeProvider } from "@/shared/theme/ThemeProvider";
import { TooltipProvider } from "@/shared/components/ui/Tooltip";
import { ToastProvider } from "@/shared/ui/ToastProvider";

export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <SocketProvider>
            <TooltipProvider>
              <ToastProvider>{children}</ToastProvider>
            </TooltipProvider>
          </SocketProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

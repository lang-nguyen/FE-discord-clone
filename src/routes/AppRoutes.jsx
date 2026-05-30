import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { HomePage } from "@/features/home/pages/HomePage";
import { ServerSettings } from "@/features/servers/components/server-settings/ServerSettings";
import { GuestRoute } from "@/routes/guards/GuestRoute";
import { ProtectedRoute } from "@/routes/guards/ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/channels/@me" element={<HomePage />} />
          <Route
            path="/test-settings"
            element={
              <ServerSettings
                serverName="5fefa96e-d2e1-4aa9-a1f6-bdc1e5c3aa10"
                onClose={() => window.location.assign("/channels/@me")}
              />
            }
          />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/channels/@me" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

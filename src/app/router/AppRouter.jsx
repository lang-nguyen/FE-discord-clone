import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { GuestRoute } from "@/routes/guards/GuestRoute";
import { ProtectedRoute } from "@/routes/guards/ProtectedRoute";
import { AppShell } from "@/app/layout/AppShell";

const LoginPage = lazy(() =>
  import("@/features/auth/pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  }))
);
const RegisterPage = lazy(() =>
  import("@/features/auth/pages/RegisterPage").then((module) => ({
    default: module.RegisterPage,
  }))
);
const HomePage = lazy(() =>
  import("@/features/home/pages/HomePage").then((module) => ({
    default: module.HomePage,
  }))
);
const ServerSettings = lazy(() =>
  import("@/features/servers/components/server-settings/ServerSettings").then((module) => ({
    default: module.ServerSettings,
  }))
);

function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-chat-bg text-primary-text">
      Loading...
    </div>
  );
}

function ServerSettingsRoute() {
  const navigate = useNavigate();
  const { serverId, section } = useParams();

  return (
    <ServerSettings
      serverName={serverId}
      initialTab={section}
      onClose={() => navigate(`/channels/${serverId}`)}
    />
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/channels/@me" element={<HomePage />} />
            <Route path="/channels/@me/:recipientId" element={<HomePage />} />
            <Route path="/channels/:serverId" element={<HomePage />} />
            <Route path="/channels/:serverId/:channelId" element={<HomePage />} />
          </Route>
          <Route path="/settings/server/:serverId/:section?" element={<ServerSettingsRoute />} />
        </Route>

        <Route path="/" element={<Navigate to="/channels/@me" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}

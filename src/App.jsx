import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './features/auth/pages/LoginPage';
import { RegisterPage } from './features/auth/pages/RegisterPage';

function App() {
  return (
    <Routes>
      {/* Main App Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={
          <div className="flex h-full items-center justify-center text-gray-400">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to Discord</h2>
              <p className="text-[#a3a6aa]">Select a server and channel to start chatting</p>
            </div>
          </div>
        } />
        {/* Future: /channels/@me, /channels/:serverId/:channelId */}
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
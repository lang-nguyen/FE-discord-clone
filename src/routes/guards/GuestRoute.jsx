import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export function GuestRoute() {
  const { accessToken, bootstrapped } = useSelector((state) => state.auth);

  if (!bootstrapped) {
    return <div className="h-screen w-full bg-[#313338]" />;
  }

  if (accessToken) {
    return <Navigate to="/channels/@me" replace />;
  }

  return <Outlet />;
}

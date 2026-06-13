import { AuthBootstrap } from "@/features/auth/components/AuthBootstrap";
import { AppRouter } from "@/app/router/AppRouter";

export default function App() {
  return (
    <AuthBootstrap>
      <AppRouter />
    </AuthBootstrap>
  );
}

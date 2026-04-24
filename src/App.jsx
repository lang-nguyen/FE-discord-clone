
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { LoginPage } from './features/auth/pages/LoginPage';
import { RegisterPage } from './features/auth/pages/RegisterPage';

function App() {
  const { socket, isConnected } = useSocket();
  const dispatch = useDispatch();
  const messages = useSelector(state => state.chat.messages);

  // States test cho UserPanel
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const mockUser = {
    username: "Tên user dài",
    statusText: "abcdefgh",
    avatarUrl: "https://github.com/shadcn.png", // Dùng avatar tạm
    onlineStatus: "online"
  };

  const handleTestSend = () => {
    const msg = {
      id: `msg-${Date.now()}`,
      content: "Hello everyone! Test message from UI.",
      sender: { id: "me", username: "MyUser", avatar: "" },
      timestamp: new Date().toISOString()
    };

    dispatch(sendMessage(msg));
    console.log("Đã dispatch tin nhắn: ", msg);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Main Content Routes will go here eventually */}
          <Route index element={
            <div className="flex h-full items-center justify-center text-gray-400">
              Main content goes here
            </div>
          } />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
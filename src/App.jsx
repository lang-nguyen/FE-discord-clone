import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from './shared/hooks/useSocket';
import { sendMessage } from './store/slices/chatSlice';
import ServerHeader from './features/servers/components/ServerHeader';
import UserPanel from './layouts/components/Sidebar/UserPanel';

function App() {
  const { socket, isConnected } = useSocket();
  const dispatch = useDispatch();
  const messages = useSelector(state => state.chat.messages);

  // States test cho UserPanel
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const mockUser = {
    username: "sw...",
    statusText: "sw...",
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
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#313338', minHeight: '100vh', color: 'white' }}>
      <h1>Màn Hình Test Hạ Tầng</h1>
      <hr />

      <h3>Test UI Component</h3>
      {/* Khung giả lập cột Sidebar bên trái (Rộng khoảng 240px, cao 500px để test cuộn) */}
      <div className="flex flex-col w-60 h-[500px] bg-[#2B2D31] border border-black/20 rounded-md overflow-hidden mt-4 mb-8">

        {/* Phần 1: Header */}
        <ServerHeader
          serverName="Công ty tốt nghiệp thiệt không"
          onClickHeader={() => alert("Mở Menu Của Server!")}
          onClickInvite={() => alert("Mời Bạn Bè!")}
        />

        {/* Phần 2: Thân (Body) cuộn được */}
        <div className="flex-1 p-4 text-sm text-gray-400 overflow-y-auto">
          <p>Danh sách channel sẽ nằm ở đây...</p>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="my-4 p-2 bg-black/10 rounded">Channel giả {i + 1}</div>
          ))}
        </div>

        {/* Phần 3: User Panel Dính Đáy (Sticky Bottom) */}
        <UserPanel
          user={mockUser}
          isMuted={isMuted}
          isDeafened={isDeafened}
          onToggleMute={() => setIsMuted(!isMuted)}
          onToggleDeafen={() => setIsDeafened(!isDeafened)}
          onClickSettings={() => alert("Open Settings!")}
          onClickProfile={() => alert("Open Profile!")}
        />
      </div>

      <hr />

      <h3>1. Test Socket Connection</h3>
      <p>
        Trạng thái:
        <strong style={{ color: isConnected ? 'green' : 'red', marginLeft: '8px' }}>
          {isConnected ? 'Đã kết nối (Online)' : 'Mất kết nối (Offline)'}
        </strong>
      </p>
      <p>Socket ID: {socket?.id || 'Đang chờ...'}</p>
      <p><em>(Bạn có thể test mất mạng bằng cách bật chế độ Offline trong tab Network F12)</em></p>

      <hr style={{ margin: '20px 0' }} />

      <h3>2. Test Redux Store & Mock Data</h3>
      <button
        onClick={handleTestSend}
        style={{ padding: '8px 16px', background: '#5865F2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Test Send "Hello" Message
      </button>
      <p>Tổng số tin đang có trong Store: <strong>{messages.length}</strong> tin nhắn</p>

      <div style={{ background: '#f0f0f0', padding: '10px', marginTop: '10px', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto' }}>
        {messages.map(m => (
          <div key={m.id} style={{ marginBottom: '8px', borderBottom: '1px solid #ccc', paddingBottom: '4px' }}>
            <span style={{ fontWeight: 'bold', color: '#5865F2' }}>{m.sender.username}</span>: {m.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
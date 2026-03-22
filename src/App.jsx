import { useState, useEffect } from "react";
import axios from "axios"; // Đừng quên import axios nhé!
import ServerSidebar from "./layouts/components/Sidebar/ServerSidebar";
import CreateServerModal from "./shared/components/modals/CreateServerModal";

function App() {
    const [activeServerName, setActiveServerName] = useState("Discord Clone Layout");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [servers, setServers] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Thêm state để biết đang load data

    useEffect(() => {
        const fetchServers = async () => {
            try {
                const response = await axios.get('https://api.yourdomain.com/servers');
                setServers(response.data);
            } catch (error) {
                console.error("Lỗi lấy dữ liệu:", error);
                
                // tạm thời gán data cũ để bạn vẫn thấy giao diện nhé
                setServers([
                    { id: "1", name: "Công ty tốt nghiệp", isActive: true },
                    { id: "2", name: "Unread Server", hasNotification: true },
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServers();
    }, []);

    const handleCreateServer = async (name) => {
        try {
            const response = await axios.post('https://api.yourdomain.com/servers', {
                name: name
            });

            // 2. Nếu OK, thêm vào danh sách hiển thị
            const newServer = response.data;
            setServers([...servers, newServer]);

        } catch (error) {
            console.error("Lỗi tạo server:", error);
            // Nếu lỗi (vì chưa có API thật), mình tạm thời tạo "ảo" để bạn test UI
            const fakeNewServer = { id: Math.random().toString(), name: name };
            setServers([...servers, fakeNewServer]);
            
            alert("Lưu ý: Đang dùng dữ liệu giả vì chưa có API thật!");
        }
    };


    return (
        <div className="flex h-screen bg-[#1e1f22]">
            {/* Truyền cả danh sách servers và hàm mở modal xuống */}
            <ServerSidebar 
                servers={servers}
                onServerClick={setActiveServerName} 
                onAddClick={() => setIsModalOpen(true)}
            />

            <div className="flex-1 ml-[72px] flex items-center justify-center text-white bg-[#313338]">
                <h1 className="text-3xl font-bold">
                    {activeServerName}
                </h1>
            </div>

            <CreateServerModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onCreate={handleCreateServer} // Truyền hàm tạo server vào Modal
            />
        </div>
    );
}




export default App;
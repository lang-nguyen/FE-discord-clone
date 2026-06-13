import HomeButton from "./HomeButton";
import ActionButton from "./ActionButton";
import ServerSidebarItem from "@/features/servers/components/ServerSidebarItem";

// Nhận danh sách servers từ App.jsx gửi xuống (Thay vì dùng mock data cố định)
const ServerSidebar = ({
    servers,
    activeServerId,
    onServerClick,
    onHomeClick,
    onAddClick,
}) => {

    return (
        <aside className="fixed inset-y-0 left-0 flex h-full w-[72px] flex-col items-center py-3 bg-server-sidebar-bg z-50">
            <HomeButton
              isActive={!activeServerId}
              onClick={onHomeClick || (() => onServerClick(null))}
            />

            <div className="w-8 h-[2px] bg-chat-bg rounded-md mb-3"/>

            <div className="flex-1 w-full overflow-y-auto scrollbar-hide flex flex-col items-center">
                {servers.map((server) => (
                    <ServerSidebarItem
                        key={server.id}
                        {...server}
                        isActive={server.id === activeServerId}
                        onServerClick={onServerClick}
                    />
                ))}

                <ActionButton 
                  type="add" 
                  name="Add a Server" 
                  onClick={onAddClick}
                />
                <ActionButton type="explore" name="Explore Discoverable Servers" />

            </div>
        </aside>
    );
};

export default ServerSidebar;

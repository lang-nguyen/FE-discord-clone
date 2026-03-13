import HomeButton from "./HomeButton";
import ActionButton from "./ActionButton";
import ServerSidebarItem from "@/features/servers/components/ServerSidebarItem";

// Mock data for servers
const servers = [
  {
    id: "1",
    name: "Công ty tốt nghiệp",
    imageUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=128&h=128&auto=format&fit=crop",
    isActive: true,
  },
  {
    id: "2",
    name: "Unread Server",
    hasNotification: true,
  },
  {
    id: "3",
    name: "Mentions Server",
    mentionsCount: 5,
  },
  {
    id: "4",
    name: "Normal Server",
  },
  {
    id: "5",
    name: "Gaming Community",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=128&h=128&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Study Group",
  },
  {
    id: "7",
    name: "Music Lovers",
  },
  {
    id: "8",
    name: "Developer Hub",
  },
];

const ServerSidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 flex h-full w-[72px] flex-col items-center py-3 bg-[#1e1f22] z-50">
      <HomeButton isActive={false} />
      
      <div className="w-8 h-[2px] bg-[#313338] rounded-md mb-3" />

      <div className="flex-1 w-full overflow-y-auto scrollbar-hide flex flex-col items-center">
        {servers.map((server) => (
          <ServerSidebarItem 
            key={server.id}
            {...server}
          />
        ))}

        <ActionButton type="add" name="Add a Server" />
        <ActionButton type="explore" name="Explore Discoverable Servers" />
      </div>
    </aside>
  );
};

export default ServerSidebar;

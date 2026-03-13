import ServerSidebarItem from "./features/servers/components/ServerSidebarItem";

function App() {
  return (
    <div className="flex h-screen bg-[#1e1f22]">
      {/* Sidebar Simulation */}
      <div className="w-[72px] flex flex-col items-center py-3 bg-[#1e1f22]">
        <ServerSidebarItem
          id="1"
          name="Công ty tốt nghiệp"
          imageUrl="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=128&h=128&auto=format&fit=crop"
          isActive={true}
        />
        
        <ServerSidebarItem
          id="2"
          name="Unread Server"
          hasNotification={true}
        />

        <ServerSidebarItem
          id="3"
          name="Mentions Server"
          mentionsCount={5}
        />

        <ServerSidebarItem
          id="4"
          name="Normal Server"
        />
      </div>

      {/* Main Content Simulation */}
      <div className="flex-1 flex items-center justify-center text-white bg-[#313338]">
        <h1 className="text-3xl font-bold">
          Server Sidebar Item Preview
        </h1>
      </div>
    </div>
  );
}

export default App;
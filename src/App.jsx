import ServerSidebar from "./layouts/components/Sidebar/ServerSidebar";

function App() {
  return (
    <div className="flex h-screen bg-[#1e1f22]">
      <ServerSidebar />

      {/* Main Content Simulation */}
      <div className="flex-1 ml-[72px] flex items-center justify-center text-white bg-[#313338]">
        <h1 className="text-3xl font-bold">
          Discord Clone Layout
        </h1>
      </div>
    </div>
  );
}

export default App;
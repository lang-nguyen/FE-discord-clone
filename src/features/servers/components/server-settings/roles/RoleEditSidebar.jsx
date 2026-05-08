import { ArrowLeft, Plus } from "lucide-react";

export const RoleEditSidebar = ({ roles, activeRoleId, onBack, onChangeActiveRole }) => {
  return (
    <div className="w-[240px] shrink-0 border-r border-[#3b3d44] pr-4 flex flex-col gap-2 h-fit sticky top-[-60px] pt-[60px]">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 px-2 py-2 text-[#a3a6aa] hover:text-gray-200 transition-colors font-bold text-[12px] uppercase tracking-wide mb-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      
      {/* Sidebar Search */}
      <div className="relative mb-2 px-1">
        <input 
          type="text" 
          placeholder="Search Roles" 
          className="w-full bg-[#1e1f22] text-[13px] text-gray-200 rounded px-2 py-1.5 focus:outline-none placeholder:text-gray-500"
        />
        <Plus className="w-4 h-4 text-gray-400 absolute right-2.5 top-1.5 cursor-pointer hover:text-white" />
      </div>

      <div className="flex flex-col gap-0.5">
        {roles.map(r => (
          <button
            key={r.id}
            onClick={() => onChangeActiveRole(r.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors text-[14px] ${r.id === activeRoleId ? 'bg-[#43444b] text-white font-medium' : 'text-gray-400 hover:bg-[#35373c] hover:text-gray-200'}`}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
            <span className="truncate">{r.name}</span>
          </button>
        ))}
        <button className="flex items-center gap-2 px-3 py-2 rounded text-gray-400 text-[14px] hover:text-gray-200 opacity-70 mt-1 cursor-default">
          <div className="w-3 h-3 rounded-full bg-gray-500" />
          <span className="truncate">@everyone</span>
        </button>
      </div>
    </div>
  );
};

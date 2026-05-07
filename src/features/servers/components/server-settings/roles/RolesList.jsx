import { Search, MoreHorizontal, Pencil, Shield } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export const RolesList = ({ roles, onCreateRole, onEditRole }) => {
  return (
    <div className="max-w-[740px]">
      <h2 className="text-[20px] font-bold text-white mb-2">Roles</h2>
      <p className="text-[#a3a6aa] text-sm mb-6">
        Use roles to group your server members and assign permissions.
      </p>

      {/* Default Permissions */}
      <div className="bg-[#2b2d31] hover:bg-[#35373c] cursor-pointer rounded-lg border border-transparent hover:border-black/50 p-4 flex items-center justify-between mb-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#313338] rounded-full flex items-center justify-center">
             <Shield className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h3 className="text-white font-medium text-[15px]">Default Permissions</h3>
            <p className="text-[#a3a6aa] text-xs">@everyone • applies to all server members</p>
          </div>
        </div>
        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </div>

      {/* Sticky Header for List */}
      <div className="sticky top-0 bg-[#313338] z-10 -mx-4 px-4 pt-0">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-2 mt-6">
          <div className="relative flex-1 bg-[#1e1f22] rounded flex items-center px-2 h-9 border border-transparent focus-within:border-black/50">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search Roles" 
              className="bg-transparent w-full py-2 text-[14px] text-gray-200 focus:outline-none"
            />
          </div>
          <Button variant="primary" onClick={onCreateRole} className="h-9 px-4 py-0 rounded-[3px] text-[13px] bg-[#5865F2] hover:bg-[#4752C4] font-medium">
            Create Role
          </Button>
        </div>
        <p className="text-[#a3a6aa] text-[13px] mb-6">
          Members use the color of the highest role they have on this list. Drag roles to reorder them. <span className="text-[#00a8fc] hover:underline cursor-pointer">Need help with permissions?</span>
        </p>

        {/* Table Header */}
        <div className="grid grid-cols-[1fr_120px_100px] items-center px-4 py-2 border-b border-[#3b3d44] mb-2 font-bold text-gray-400 text-[12px] uppercase tracking-wide">
          <div>Roles - {roles.length}</div>
          <div>Members</div>
          <div></div>
        </div>
      </div>

      {/* Role Items */}
      <div className="flex flex-col gap-1 pb-10">
        {roles.map(role => (
          <div key={role.id} className="group grid grid-cols-[1fr_120px_100px] items-center px-4 py-3 bg-transparent hover:bg-[#35373c] rounded-[4px] border-b hover:border-transparent border-[#3b3d44] transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5" style={{ color: role.color }} />
              <span className="text-gray-200 font-medium text-[15px] group-hover:text-white transition-colors">{role.name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="text-[14px] font-medium text-gray-200">{role.memberCount}</span>
              <svg className="w-[18px] h-[18px] mb-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4zM12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" /></svg>
            </div>
            <div className="flex items-center gap-2 justify-end opacity-100 transition-opacity">
              <button 
                onClick={() => onEditRole(role.id)} 
                className="w-8 h-8 rounded-full bg-[#2b2d31] hover:bg-[#43444b] flex items-center justify-center text-gray-300 pointer-events-auto"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#2b2d31] hover:bg-[#43444b] flex items-center justify-center text-gray-300">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

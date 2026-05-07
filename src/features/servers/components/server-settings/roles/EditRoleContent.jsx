import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { RoleEditSidebar } from "./RoleEditSidebar";
import { RoleDisplayTab } from "./RoleDisplayTab";

export const EditRoleContent = ({ role, roles, onUpdate, onBack, onChangeActiveRole, STANDARD_COLORS }) => {
  const [activeTab, setActiveTab] = useState('Display');
  const tabs = ['Display', 'Permissions', 'Links', 'Manage Members (0)'];

  if (!role) return null;

  return (
    <div className="flex gap-10 max-w-[1024px]">
      {/* 1. Sidebar bên trái */}
      <RoleEditSidebar 
        roles={roles}
        activeRoleId={role.id}
        onBack={onBack}
        onChangeActiveRole={onChangeActiveRole}
      />

      {/* 2. Nội dung bên phải */}
      <div className="flex-1 pb-32">
        <div className="sticky top-[-60px] bg-[#313338] z-20 -mx-4 px-4 pt-[60px] border-b border-transparent">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[16px] font-bold text-white uppercase tracking-wide">
              Edit Role — {role.name}
            </h2>
            <button className="w-8 h-8 rounded-full hover:bg-[#35373c] flex items-center justify-center text-gray-300">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs Điều hướng */}
          <div className="flex items-center gap-6 border-b border-[#3b3d44] mb-8">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`py-3 -mb-px text-[15px] font-medium border-b-2 transition-colors ${activeTab.includes(t.split(' ')[0]) ? 'text-white border-[#5865F2]' : 'text-[#a3a6aa] border-transparent hover:text-gray-200 hover:border-gray-500'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Nội dung Tab tương ứng */}
        {activeTab === 'Display' && (
          <RoleDisplayTab 
            role={role}
            onUpdate={onUpdate}
            STANDARD_COLORS={STANDARD_COLORS}
          />
        )}

        {/* Các Tab khác có thể thêm vào đây: Permissions, Links... */}
        {activeTab !== 'Display' && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <p>Tab {activeTab} is currently under development.</p>
            </div>
        )}
      </div>
    </div>
  );
};

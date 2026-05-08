import { Shield, Image as ImageIcon, Check, Pencil, ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/shared/components/ui/Button";

export const RoleDisplayTab = ({ role, onUpdate, STANDARD_COLORS }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpdate({ iconUrl: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="space-y-8 max-w-[500px]">
       {/* Role Name */}
       <div className="space-y-2">
         <label className="text-[12px] font-bold text-[#b5bac1] uppercase tracking-wide flex items-center">
           Role name <span className="text-[#da373c] ml-1 text-sm">*</span>
         </label>
         <input 
           value={role.name}
           onChange={(e) => onUpdate({ name: e.target.value })}
           className="w-full bg-[#1e1f22] text-gray-200 rounded p-2.5 text-[15px] border border-transparent focus:outline-none focus:border-blue-500"
         />
       </div>

       {/* Role Style */}
       <div className="space-y-2">
         <label className="text-[12px] font-bold text-[#b5bac1] uppercase tracking-wide">Role Style</label>
         <div className="flex items-center gap-3">
           {/* Solid */}
           <div className="p-[2px] rounded border-2 border-[#5865F2] cursor-pointer">
             <div className="bg-[#2b2d31] rounded flex flex-col items-center justify-center w-[120px] h-[80px] hover:bg-[#35373c]">
               <div className="flex items-center gap-1.5 mb-2">
                 <span className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color }} />
                 <span className="font-medium text-[14px]" style={{ color: role.color }}>Wumpus</span>
               </div>
               <div className="text-[12px] bg-[#313338] px-2 py-0.5 rounded font-medium text-gray-300">Solid</div>
             </div>
           </div>
           {/* Gradient/Holo mocking */}
           <div className="p-[2px] rounded border-2 border-transparent cursor-pointer opacity-40">
             <div className="bg-[#2b2d31] rounded flex flex-col items-center justify-center w-[120px] h-[80px]">
               <div className="flex items-center gap-1.5 mb-2">
                 <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-[#f47bbb] to-[#5865F2]" />
                 <span className="font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#f47bbb] to-[#5865F2] text-[14px]">Wumpus</span>
               </div>
               <div className="text-[12px] bg-[#313338] px-2 py-0.5 rounded font-medium text-gray-300">Gradient</div>
             </div>
           </div>
         </div>
         
         <div className="mt-2 bg-gradient-to-r from-[#2b2d31] to-[#232428] p-3 rounded-[8px] flex items-center justify-between border border-[#3b3d44] min-w-[500px]">
           <div className="text-sm">
             <span className="font-bold text-white text-[14px]">Make certain roles <span className="text-[#f47bbb]">magical</span></span>
             <p className="text-gray-400 text-[12px]">Unlock new role styles with Boosting.</p>
           </div>
           <button className="bg-white text-black px-4 py-1.5 rounded-[4px] font-bold text-[13px] hover:bg-gray-200 flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,123,187,0.3)]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L8.5 8.5 1 12l7.5 3.5L12 23l3.5-7.5L23 12l-7.5-3.5z"/></svg>
              Unlock with Boosting
           </button>
         </div>
       </div>

       {/* Role Color */}
       <div className="space-y-2">
         <div className="text-[12px] font-bold text-[#b5bac1] uppercase tracking-wide flex items-center">
           Role color <span className="text-[#da373c] ml-1 text-sm">*</span>
         </div>
         <p className="text-[#a3a6aa] text-[13px]">Members use the color of the highest role they have on the roles list.</p>
         
         <div className="flex items-start gap-4 pt-2">
           <button className={`w-[70px] h-[55px] relative rounded-[4px] shrink-0 border-[3px] transition-colors ${role.color === '#99aab5' ? 'border-white bg-[#b5bac1]' : 'border-transparent bg-[#b5bac1] hover:bg-[#a8b1b8]'}`} onClick={() => onUpdate({ color: '#99aab5' })}>
             {role.color === '#99aab5' && <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white" />}
             <div className="absolute -bottom-6 w-max left-1/2 -translate-x-1/2 text-[10px] text-gray-400 font-bold">DEFAULT</div>
           </button>

           <div className="w-[70px] h-[55px] bg-[#1e1f22] rounded-[4px] shrink-0 flex items-center justify-center cursor-pointer border hover:border-black transition-colors">
              <Pencil className="w-5 h-5 text-white" />
           </div>
           
           <div className="grid grid-cols-10 grid-rows-2 gap-[5px]">
             {STANDARD_COLORS.map(c => (
               <button
                 key={c}
                 onClick={() => onUpdate({ color: c })}
                 className={`w-6 h-6 rounded-[4px] ${role.color === c ? 'ring-[3px] ring-white ring-offset-2 ring-offset-[#313338]' : 'hover:scale-110 transition-transform'}`}
                 style={{ backgroundColor: c }}
               />
             ))}
           </div>
         </div>
       </div>

       {/* Role Icon */}
       <div className="space-y-3 pt-6">
         <div className="flex items-center gap-2">
           <div className="text-[12px] font-bold text-[#b5bac1] uppercase tracking-wide">Role icon</div>
           <div className="bg-[#2b2d31] text-[11px] font-bold text-gray-100 px-1.5 py-0.5 rounded-full flex items-center gap-1 border border-transparent shadow-[0_0_8px_rgba(244,123,187,0.15)]">
             <svg className="w-3 h-3 text-[#f47bbb]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
             LVL 2
           </div>
         </div>
         <p className="text-[#a3a6aa] text-[13px] leading-snug">
           Upload an image under 256 KB or pick a custom emoji from this server. We recommend at least 64x64 pixels. Members will see the icon for their highest role if they have multiple roles.
         </p>
         <input 
           type="file" 
           ref={fileInputRef} 
           className="hidden" 
           accept="image/*"
           onChange={handleFileChange}
         />
         <div className="flex items-start gap-4 mt-2">
           <div 
             className="w-[72px] h-[72px] bg-[#2b2d31] rounded-lg border-[2px] border-dashed border-[#4e5058] flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors overflow-hidden"
             onClick={() => fileInputRef.current?.click()}
           >
             {role.iconUrl ? (
               <img src={role.iconUrl} alt="Role Icon" className="w-full h-full object-cover" />
             ) : (
               <ImageIcon className="w-7 h-7 text-[#b5bac1]" />
             )}
           </div>
           <Button 
             variant="primary" 
             className="bg-[#5865F2] hover:bg-[#4752C4] h-[36px] mt-4 px-4 font-medium text-[14px] rounded-[3px]"
             onClick={() => fileInputRef.current?.click()}
           >
             Choose Image
           </Button>
         </div>
       </div>

       <div className="w-full h-px bg-[#3b3d44] my-10" />

       {/* Toggles */}
       <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="pr-4 text-[15px] font-medium text-gray-200 leading-snug">
              Display role members separately from online members
            </div>
            <button 
              onClick={() => onUpdate({ isSeparate: !role.isSeparate })}
              className={`shrink-0 w-10 h-6 rounded-full transition-colors relative mt-0.5 ${role.isSeparate ? 'bg-[#23a559]' : 'bg-[#80848e]'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${role.isSeparate ? 'left-5' : 'left-1'}`} />
            </button>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="pr-4">
              <h3 className="text-[15px] font-medium text-gray-200">Allow anyone to @mention this role</h3>
              <p className="text-[#a3a6aa] text-[13px] mt-1 pr-6 leading-snug">
                Note: Members with the "Mention @everyone, @here, and All Roles" permission will always be able to ping this role.
              </p>
            </div>
            <button 
              onClick={() => onUpdate({ isMentionable: !role.isMentionable })}
              className={`shrink-0 w-10 h-6 rounded-full transition-colors relative mt-0.5 ${role.isMentionable ? 'bg-[#23a559]' : 'bg-[#80848e]'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${role.isMentionable ? 'left-5' : 'left-1'}`} />
            </button>
          </div>

          <div className="pt-4">
            <h3 className="text-[12px] font-bold text-[#b5bac1] uppercase tracking-wide mb-1">View Server As Role</h3>
            <p className="text-[#a3a6aa] text-[13px] mb-4">
              This will let you test what actions this role can take and what channels it can see. Only available to Server Owners and Admins.
            </p>
            <Button variant="secondary" className="bg-[#4e5058] hover:bg-[#6d6f78] text-white font-medium text-[13px] h-9 px-4 rounded-[4px] flex items-center gap-1.5 w-max">
              View Server As Role
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </div>
       </div>
    </div>
  );
};

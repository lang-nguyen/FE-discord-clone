import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Gamepad2, Heart, GraduationCap, School, Wand2, Globe, Users, Plus } from 'lucide-react';

const CreateServerModal = ({ isOpen, onClose, onCreate }) => {
  const [step, setStep] = useState(1);
  const [serverName, setServerName] = useState("");

  // Reset khi đóng modal
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setServerName("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Hàm xử lý tạo server thật
  const handleCreate = () => {
    if (serverName.trim()) {
      onCreate(serverName); // Gọi hàm ở App.jsx
      onClose(); // Đóng modal
    }
  };

  const templates = [
    { title: "Gaming", icon: <Gamepad2 className="text-[#5865f2]" /> },
    { title: "Friends", icon: <Heart className="text-[#eb459e]" /> },
    { title: "Study Group", icon: <GraduationCap className="text-[#f1c40f]" /> },
    { title: "School Club", icon: <School className="text-[#e67e22]" /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative bg-white w-[440px] rounded-lg shadow-2xl p-0 overflow-hidden animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-700 transition">
          <X size={24} />
        </button>

        {/* --- SCREEN 1: TEMPLATES --- */}
        {step === 1 && (
          <div className="animate-in slide-in-from-right duration-300">
            <div className="px-10 py-6 text-center">
              <h2 className="text-2xl font-bold text-zinc-800 mb-2">Create Your Server</h2>
              <p className="text-zinc-500 text-[15px]">Your server is where you and your friends hang out. Make yours and start talking.</p>
            </div>
            <div className="px-4 pb-4 space-y-2">
              <button onClick={() => setStep(2)} className="w-full flex items-center justify-between p-3 border border-zinc-200 rounded-lg hover:bg-zinc-100 transition group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-100 rounded-full group-hover:bg-white"><Wand2 className="text-[#5865f2]" /></div>
                  <span className="font-bold text-zinc-700">Create My Own</span>
                </div>
                <ChevronRight className="text-zinc-400" size={20} />
              </button>
              <div className="pt-4 pb-2 text-xs font-bold text-zinc-500 uppercase px-1">Start from a template</div>
              {templates.map((template) => (
                <button key={template.title} onClick={() => setStep(2)} className="w-full flex items-center justify-between p-3 border border-zinc-200 rounded-lg hover:bg-zinc-100 transition group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-100 rounded-full group-hover:bg-white">{template.icon}</div>
                    <span className="font-bold text-zinc-700">{template.title}</span>
                  </div>
                  <ChevronRight className="text-zinc-400" size={20} />
                </button>
              ))}
            </div>
            <div className="bg-zinc-100 p-6 text-center">
              <h3 className="text-xl font-bold text-zinc-800 mb-2">Have an invite already?</h3>
              <button className="w-full py-2.5 bg-zinc-400 hover:bg-zinc-500 text-white font-bold rounded transition">Join a Server</button>
            </div>
          </div>
        )}

        {/* --- SCREEN 2: TELL US MORE --- */}
        {step === 2 && (
          <div className="animate-in slide-in-from-right duration-300">
            <div className="px-10 py-6 text-center">
              <h2 className="text-2xl font-bold text-zinc-800 mb-2">Tell Us More About Your Server</h2>
              <p className="text-zinc-500 text-[15px]">In order to help you with your setup, is your new server for just a few friends or a larger community?</p>
            </div>
            <div className="px-4 pb-4 space-y-3">
              <button onClick={() => setStep(3)} className="w-full flex items-center justify-between p-4 border border-zinc-200 rounded-lg hover:bg-zinc-100 transition group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-zinc-100 rounded-lg"><Globe className="text-[#5865f2]" size={32} /></div>
                  <span className="font-bold text-zinc-700 text-lg">For a club or community</span>
                </div>
                <ChevronRight className="text-zinc-400" size={24} />
              </button>
              <button onClick={() => setStep(3)} className="w-full flex items-center justify-between p-4 border border-zinc-200 rounded-lg hover:bg-zinc-100 transition group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-zinc-100 rounded-lg"><Users className="text-[#5865f2]" size={32} /></div>
                  <span className="font-bold text-zinc-700 text-lg">For me and my friends</span>
                </div>
                <ChevronRight className="text-zinc-400" size={24} />
              </button>
              <p className="text-center text-zinc-500 text-sm py-2">Not sure? You can <span onClick={() => setStep(3)} className="text-[#00a8fc] hover:underline cursor-pointer">skip this question</span> for now.</p>
            </div>
            <div className="bg-zinc-100 p-4 px-6 flex items-center"><button onClick={() => setStep(1)} className="text-zinc-600 hover:underline font-medium">Back</button></div>
          </div>
        )}

        {/* --- SCREEN 3: CUSTOMIZE --- */}
        {step === 3 && (
          <div className="animate-in slide-in-from-right duration-300">
            <div className="px-10 py-6 text-center">
              <h2 className="text-2xl font-bold text-zinc-800 mb-2">Customize Your Server</h2>
              <p className="text-zinc-500 text-[15px]">Give your new server a personality with a name and an icon. You can always change it later.</p>
            </div>
            <div className="px-6 pb-4">
               <div className="flex justify-center mb-4">
                  <div className="w-[80px] h-[80px] border-2 border-dashed border-zinc-300 rounded-full flex flex-col items-center justify-center text-zinc-500 cursor-pointer hover:border-[#5865f2] hover:text-[#5865f2] transition group relative">
                    <div className="bg-[#5865f2] text-white p-1 rounded-full absolute -top-1 -right-1 border-4 border-white"><Plus size={14} strokeWidth={4} /></div>
                    <Wand2 size={32} />
                    <span className="text-[10px] font-bold mt-1 uppercase">Upload</span>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Server Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" value={serverName} onChange={(e) => setServerName(e.target.value)}
                    className="w-full p-2 bg-zinc-100 border-none rounded-md focus:ring-0 text-zinc-700 font-medium"
                    placeholder="Enter server name"
                  />
                  <p className="text-[11px] text-zinc-500">By creating a server, you agree to Discord's <span className="text-[#00a8fc] font-bold cursor-pointer hover:underline">Community Guidelines</span>.</p>
               </div>
            </div>
            <div className="bg-zinc-100 p-4 px-6 flex items-center justify-between">
              <button onClick={() => setStep(2)} className="text-zinc-600 hover:underline font-medium">Back</button>
              <button onClick={handleCreate} disabled={!serverName.trim()} className="px-6 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold rounded transition disabled:opacity-50">Create</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateServerModal;

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronRight,
  Gamepad2,
  Heart,
  GraduationCap,
  School,
  Wand2,
  Globe,
  Users,
  Camera,
} from "lucide-react";

const CreateServerModal = ({ isOpen, onClose, onCreate, isLoading = false }) => {
  const [step, setStep] = useState(1);
  const [serverName, setServerName] = useState("");
  const [iconPreview, setIconPreview] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const fileInputRef = useRef(null);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setServerName("");
      setIconPreview(null);
      setIconFile(null);
      setSubmitError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleIconChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIconFile(file);
    const reader = new FileReader();
    reader.onload = (evt) => setIconPreview(evt.target.result);
    reader.readAsDataURL(file);
  };

  const handleCreate = async () => {
    if (!serverName.trim() || isLoading) return;
    setSubmitError("");
    try {
      await onCreate(serverName.trim(), iconFile);
      onClose();
    } catch {
      setSubmitError("Unable to create the server. Please try again.");
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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" onClick={onClose} />

      <div className="relative bg-chat-bg text-primary-text w-[440px] rounded-lg shadow-2xl p-0 overflow-hidden animate-in fade-in zoom-in duration-200 border border-server-sidebar-bg/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-text hover:text-primary-text transition z-10"
          aria-label="Close dialog"
        >
          <X size={24} />
        </button>

        {/* --- SCREEN 1: TEMPLATES --- */}
        {step === 1 && (
          <div className="animate-in slide-in-from-right duration-300">
            <div className="px-10 py-6 text-center">
              <h2 className="text-2xl font-bold text-primary-text mb-2">Create Your Server</h2>
              <p className="text-muted-text text-[15px]">
                Your server is where you and your friends hang out. Make yours and start talking.
              </p>
            </div>
            <div className="px-4 pb-4 space-y-2">
              <button
                onClick={() => setStep(2)}
                className="w-full flex items-center justify-between p-3 border border-server-sidebar-bg/30 rounded-lg bg-user-panel-bg/40 hover:bg-hover-bg transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-input-bg rounded-full group-hover:bg-chat-bg">
                    <Wand2 className="text-[#5865f2]" />
                  </div>
                  <span className="font-bold text-primary-text">Create My Own</span>
                </div>
                <ChevronRight className="text-muted-text" size={20} />
              </button>
              <div className="pt-4 pb-2 text-xs font-bold text-muted-text uppercase px-1">
                Start from a template
              </div>
              {templates.map((template) => (
                <button
                  key={template.title}
                  onClick={() => setStep(2)}
                  className="w-full flex items-center justify-between p-3 border border-server-sidebar-bg/30 rounded-lg bg-user-panel-bg/40 hover:bg-hover-bg transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-input-bg rounded-full group-hover:bg-chat-bg">
                      {template.icon}
                    </div>
                    <span className="font-bold text-primary-text">{template.title}</span>
                  </div>
                  <ChevronRight className="text-muted-text" size={20} />
                </button>
              ))}
            </div>
            <div className="bg-user-panel-bg p-6 text-center border-t border-server-sidebar-bg/30">
              <h3 className="text-xl font-bold text-primary-text mb-2">Have an invite already?</h3>
              <button className="w-full py-2.5 bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold rounded transition">
                Join a Server
              </button>
            </div>
          </div>
        )}

        {/* --- SCREEN 2: TELL US MORE --- */}
        {step === 2 && (
          <div className="animate-in slide-in-from-right duration-300">
            <div className="px-10 py-6 text-center">
              <h2 className="text-2xl font-bold text-primary-text mb-2">
                Tell Us More About Your Server
              </h2>
              <p className="text-muted-text text-[15px]">
                In order to help you with your setup, is your new server for just a few friends or a
                larger community?
              </p>
            </div>
            <div className="px-4 pb-4 space-y-3">
              <button
                onClick={() => setStep(3)}
                className="w-full flex items-center justify-between p-4 border border-server-sidebar-bg/30 rounded-lg bg-user-panel-bg/40 hover:bg-hover-bg transition group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-input-bg rounded-lg">
                    <Globe className="text-[#5865f2]" size={32} />
                  </div>
                  <span className="font-bold text-primary-text text-lg">
                    For a club or community
                  </span>
                </div>
                <ChevronRight className="text-muted-text" size={24} />
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-full flex items-center justify-between p-4 border border-server-sidebar-bg/30 rounded-lg bg-user-panel-bg/40 hover:bg-hover-bg transition group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-input-bg rounded-lg">
                    <Users className="text-[#5865f2]" size={32} />
                  </div>
                  <span className="font-bold text-primary-text text-lg">For me and my friends</span>
                </div>
                <ChevronRight className="text-muted-text" size={24} />
              </button>
              <p className="text-center text-muted-text text-sm py-2">
                Not sure? You can{" "}
                <span
                  onClick={() => setStep(3)}
                  className="text-[#00a8fc] hover:underline cursor-pointer"
                >
                  skip this question
                </span>{" "}
                for now.
              </p>
            </div>
            <div className="bg-user-panel-bg p-4 px-6 flex items-center border-t border-server-sidebar-bg/30">
              <button
                onClick={() => setStep(1)}
                className="text-muted-text hover:text-primary-text hover:underline font-medium"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* --- SCREEN 3: CUSTOMIZE --- */}
        {step === 3 && (
          <div className="animate-in slide-in-from-right duration-300">
            <div className="px-10 py-6 text-center">
              <h2 className="text-2xl font-bold text-primary-text mb-2">Customize Your Server</h2>
              <p className="text-muted-text text-[15px]">
                Give your new server a personality with a name and an icon. You can always change it
                later.
              </p>
            </div>
            <div className="px-6 pb-4">
              {/* Icon Upload */}
              <div className="flex justify-center mb-6">
                <div
                  className="relative w-[80px] h-[80px] rounded-full cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {iconPreview ? (
                    <>
                      <img
                        src={iconPreview}
                        alt="Server icon preview"
                        className="w-full h-full rounded-full object-cover"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 rounded-full bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={20} className="text-white" />
                        <span className="text-white text-[9px] font-bold mt-1 uppercase">
                          Change
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full border-2 border-dashed border-server-sidebar-bg rounded-full flex flex-col items-center justify-center text-muted-text hover:border-[#5865f2] hover:text-[#5865f2] transition group-hover:border-[#5865f2]">
                      <div className="bg-[#5865f2] text-white p-1 rounded-full absolute -top-1 -right-1 border-4 border-chat-bg">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <Camera size={28} />
                      <span className="text-[9px] font-bold mt-1 uppercase">Upload</span>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleIconChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-text uppercase">
                  Server Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                  className="w-full p-2.5 bg-input-bg border-none rounded-md focus:ring-0 text-primary-text font-medium outline-none transition focus:ring-1 focus:ring-[#5865f2]"
                  placeholder="Enter server name"
                  autoFocus
                />
                <p className="text-[11px] text-muted-text">
                  By creating a server, you agree to Discord's{" "}
                  <span className="text-[#00a8fc] font-bold cursor-pointer hover:underline">
                    Community Guidelines
                  </span>
                  .
                </p>
                {submitError && <p className="text-xs text-red-300">{submitError}</p>}
              </div>
            </div>
            <div className="bg-user-panel-bg p-4 px-6 flex items-center justify-between border-t border-server-sidebar-bg/30">
              <button
                onClick={() => setStep(2)}
                className="text-muted-text hover:text-primary-text hover:underline font-medium"
              >
                Back
              </button>
              <button
                onClick={handleCreate}
                disabled={!serverName.trim() || isLoading}
                className="px-6 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateServerModal;

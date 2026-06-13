import React, { useState, useEffect } from "react";
import { X, Hash, Volume2, Lock } from "lucide-react";

const CreateChannelModal = ({ isOpen, onClose, onCreate, categoryName, isLoading = false }) => {
  const [channelType, setChannelType] = useState("text"); // 'text' or 'voice'
  const [channelName, setChannelName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Reset states on close
  useEffect(() => {
    if (!isOpen) {
      setChannelType("text");
      setChannelName("");
      setIsPrivate(false);
      setSubmitError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Format channel name as user types (lowercase, replace spaces with hyphens for text channels)
  const handleNameChange = (e) => {
    let value = e.target.value;
    if (channelType === "text") {
      value = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-_]/g, "");
    }
    setChannelName(value);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (channelName.trim() && !isLoading) {
      setSubmitError("");
      try {
        await onCreate({
          name: channelName.trim(),
          type: channelType,
          isPrivate: isPrivate,
        });
        onClose();
      } catch {
        setSubmitError("Unable to create the channel. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-chat-bg text-primary-text w-[460px] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-server-sidebar-bg/30">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold select-none">Create Channel</h2>
            {categoryName && (
              <p className="text-xs text-muted-text mt-0.5 select-none">in {categoryName}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-muted-text hover:text-primary-text transition"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCreate}>
          <div className="px-6 pb-6 space-y-5">
            {/* 1. CHANNEL TYPE SELECTOR */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wide text-muted-text select-none">
                Channel Type
              </label>

              <div className="space-y-2">
                {/* Text Channel Option */}
                <button
                  type="button"
                  onClick={() => setChannelType("text")}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-md transition select-none ${
                    channelType === "text"
                      ? "bg-hover-bg text-primary-text"
                      : "bg-user-panel-bg/50 hover:bg-hover-bg/40 text-muted-text hover:text-primary-text"
                  }`}
                >
                  <Hash className="w-6 h-6 shrink-0" />
                  <div className="text-left">
                    <div className="font-bold text-sm">Text</div>
                    <div className="text-xs text-muted-text mt-0.5">
                      Post messages, images, memes, opinions, and puns
                    </div>
                  </div>
                </button>

                {/* Voice Channel Option */}
                <button
                  type="button"
                  onClick={() => setChannelType("voice")}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-md transition select-none ${
                    channelType === "voice"
                      ? "bg-hover-bg text-primary-text"
                      : "bg-user-panel-bg/50 hover:bg-hover-bg/40 text-muted-text hover:text-primary-text"
                  }`}
                >
                  <Volume2 className="w-6 h-6 shrink-0" />
                  <div className="text-left">
                    <div className="font-bold text-sm">Voice</div>
                    <div className="text-xs text-muted-text mt-0.5">
                      Hang out together with voice, video, and screen share
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. CHANNEL NAME INPUT */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wide text-muted-text select-none">
                Channel Name
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-muted-text pointer-events-none">
                  {channelType === "text" ? <Hash size={16} /> : <Volume2 size={16} />}
                </div>
                <input
                  type="text"
                  value={channelName}
                  onChange={handleNameChange}
                  placeholder={channelType === "text" ? "new-channel" : "New Channel"}
                  maxLength={100}
                  required
                  className="w-full bg-input-bg text-primary-text text-sm rounded-[4px] pl-9 pr-4 py-2.5 outline-none focus:ring-0 placeholder:text-muted-text/50 font-medium border border-transparent transition focus:border-[#5865f2]"
                />
              </div>
            </div>

            {/* 3. PRIVATE CHANNEL TOGGLE */}
            <div className="flex items-center justify-between p-2 rounded-md bg-user-panel-bg/30">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-muted-text shrink-0 mt-0.5" />
                <div className="text-left">
                  <div className="font-bold text-sm flex items-center gap-1.5 select-none">
                    Private Channel
                  </div>
                  <div className="text-xs text-muted-text mt-0.5 select-none max-w-[280px]">
                    Only selected members and roles will be able to view this channel.
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#23a559]" />
              </label>
            </div>
            {submitError && <p className="text-xs text-red-300">{submitError}</p>}
          </div>

          {/* Footer Actions */}
          <div className="bg-user-panel-bg px-6 py-4 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium hover:underline px-4 py-2 text-muted-text hover:text-primary-text transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!channelName.trim() || isLoading}
              className="px-6 py-2 bg-[#5865f2] hover:bg-[#4752c4] disabled:opacity-50 text-white text-sm font-bold rounded transition"
            >
              {isLoading ? "Creating..." : "Create Channel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelModal;

import React from 'react';
import { useInvite } from '../composables/invite';

export const InvitePage = () => {
  const { isLoading, error, inviteData, handleAccept } = useInvite();

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#000000]">
      {/* Background with abstract starry/glow effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E1F2A] via-[#2F3142] to-[#1a1b2a] opacity-100" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#5865F2] rounded-full mix-blend-screen filter blur-[150px] opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#eb459f] rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
        
        <div className="absolute w-2 h-2 bg-white rounded-full opacity-60 top-[20%] left-[10%] shadow-[0_0_10px_white]"></div>
        <div className="absolute w-3 h-3 bg-white rounded-full opacity-40 top-[50%] left-[80%] shadow-[0_0_15px_white]"></div>
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-50 top-[80%] left-[30%] shadow-[0_0_8px_white]"></div>
      </div>

      {/* Top Left Logo */}
      <div className="absolute top-8 left-8 z-20 flex items-center gap-2">
        <svg className="w-8 h-8 text-white" viewBox="0 0 127.14 96.36">
          <path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77.7,77.7,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96,46,96,53,91,65.69,84.69,65.69Z"/>
        </svg>
        <span className="text-white font-bold text-xl tracking-tight">Discord</span>
      </div>

      {/* Main Card */}
      <div className="relative z-10 py-8 px-8 flex flex-col items-center justify-center w-full max-w-[440px] bg-[#313338] rounded-md shadow-2xl min-h-[300px]">
        {isLoading ? (
          <div className="w-8 h-8 rounded-full border-4 border-[#5865F2] border-t-transparent animate-spin"></div>
        ) : error || !inviteData ? (
          <div className="text-center w-full">
            <h2 className="text-white text-2xl font-bold mb-2">Invite Invalid</h2>
            <p className="text-[#B5BAC1] text-[15px] mb-8">This invite may have expired, or you might not have permission to join.</p>
            <button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium py-1 px-4 rounded text-base transition-colors duration-200 h-11">
              Continue to Discord
            </button>
          </div>
        ) : (
          <>
            {/* Inviter Avatar (Overlapping Top) */}
            <div className="absolute -top-10 w-[84px] h-[84px] rounded-full overflow-hidden bg-[#1e1f22] flex items-center justify-center border-[6px] border-[#313338]">
              {inviteData.inviter?.avatar ? (
                <img 
                  src={inviteData.inviter.avatar} 
                  alt="Inviter Avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-indigo-500"></div>
              )}
            </div>

            {/* Spacing for avatar overlap */}
            <div className="mt-8 mb-2">
              <p className="text-[#B5BAC1] text-[15px] font-normal text-center">
                {inviteData.inviter?.globalName || inviteData.inviter?.username} (.{inviteData.inviter?.username}) invited you to join
              </p>
            </div>

            {/* Server Info */}
            <div className="flex items-center justify-center gap-3 mb-1 w-full">
              {inviteData.server?.icon ? (
                <img 
                  src={inviteData.server.icon} 
                  alt="Server Icon" 
                  className="w-[32px] h-[32px] rounded-[10px] object-cover shrink-0"
                />
              ) : (
                <div className="w-[32px] h-[32px] rounded-[10px] bg-[#5865F2] flex items-center justify-center shrink-0 overflow-hidden">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 127.14 96.36">
                    <path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77.7,77.7,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96,46,96,53,91,65.69,84.69,65.69Z"/>
                  </svg>
                </div>
              )}
              <h1 className="text-white text-[24px] font-bold truncate">{inviteData.server?.name}</h1>
            </div>

            {/* Member Counts */}
            <div className="flex items-center justify-center gap-4 text-sm font-medium text-[#B5BAC1] mb-10 w-full mt-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#23A559]"></div>
                <span>{inviteData.server?.onlineCount} Online</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#B5BAC1]"></div>
                <span>{inviteData.server?.memberCount} Members</span>
              </div>
            </div>

            {/* Accept Button */}
            <button 
              onClick={handleAccept}
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium py-1 px-4 rounded text-base transition-colors duration-200 h-11 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Accept Invite
            </button>
          </>
        )}
      </div>
    </div>
  );
};

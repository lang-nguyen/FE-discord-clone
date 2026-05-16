import React from "react";
import { useBans } from "../../../composables/bans";
import { RevokeBanDialog } from "./RevokeBanDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/Avatar";
import { Search } from "lucide-react";

export const ServerBans = ({ serverName }) => {
  const bansLogic = useBans({ serverName });

  return (
    <div className="flex-1 min-w-0">
      <div className="mb-6">
        <h2 className="text-[16px] font-bold text-white mb-2">Bans</h2>
        <p className="text-[14px] text-gray-400">
          Bans are by account and IP address. If you ban someone, they will not be able to join the server until you revoke the ban.
        </p>
      </div>

      <div className="mb-4">
        <div className="relative w-full rounded bg-[#1e1f22] flex items-center px-2">
          <input
            type="text"
            className="w-full bg-transparent text-gray-200 text-sm py-2 px-2 outline-none placeholder:text-gray-500"
            placeholder="Search bans"
            value={bansLogic.searchQuery}
            onChange={(e) => bansLogic.setSearchQuery(e.target.value)}
          />
          <Search className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="space-y-1">
        {bansLogic.bans.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">
            No banned users found.
          </div>
        ) : (
          bansLogic.bans.map(ban => (
            <div key={ban.id} className="flex items-center justify-between p-2 rounded hover:bg-[#35373c] group">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-indigo-500 text-white">
                    {ban.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-200 font-medium">{ban.name}</span>
                    <span className="text-gray-400 text-sm ml-1">@{ban.username}</span>
                  </div>
                  {ban.reason && (
                    <div className="text-gray-400 text-xs mt-0.5 max-w-md truncate">
                      Reason: {ban.reason}
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => bansLogic.openRevokeDialog(ban)}
                className="hidden group-hover:block px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded font-medium transition-colors"
              >
                Revoke Ban
              </button>
            </div>
          ))
        )}
      </div>

      <RevokeBanDialog
        open={bansLogic.revokeDialogOpen}
        onOpenChange={bansLogic.closeRevokeDialog}
        targetBan={bansLogic.revokeTarget}
        onConfirm={bansLogic.confirmRevoke}
      />

      {bansLogic.toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#232428] border border-[#1e1f22] text-white px-4 py-3 rounded-[4px] shadow-lg flex items-center gap-3 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-5 h-5 rounded-full bg-[#23a559] flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <span className="text-[14px] font-medium">{bansLogic.toastMessage}</span>
        </div>
      )}
    </div>
  );
};

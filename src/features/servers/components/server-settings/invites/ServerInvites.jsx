import { useInvites } from "@/features/servers/composables/invites";
import { InvitesTable } from "./InvitesTable";
import { PauseInvitesDialog } from "./PauseInvitesDialog";
import { CreateInviteDialog } from "./CreateInviteDialog";
import { EditInviteDialog } from "./EditInviteDialog";
import { useState, useRef } from "react";

export const ServerInvites = ({ serverId }) => {
  const inviteLogic = useInvites(serverId);
  const [editInviteOpen, setEditInviteOpen] = useState(false);
  const skipGenerateRef = useRef(false);

  return (
    <div className="flex-1 min-w-0 pr-6">
      <div className="flex flex-col mb-2">
        <h2 className="text-xl font-bold text-white mb-10">Invites</h2>

        <div className="flex items-center justify-between">
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wide">
            {inviteLogic.isLoading ? "LOADING..." : (inviteLogic.invites.length === 0 ? "NO ACTIVE INVITE LINKS" : "ACTIVE INVITE LINKS")}
          </h3>
          <div className="flex items-center gap-3">
            {inviteLogic.isInvitesPaused ? (
              <button
                onClick={() => inviteLogic.setPauseDialogOpen(true)}
                className="px-4 py-2.5 text-sm font-medium text-white bg-[#5865F2] hover:bg-[#4752c4] rounded-[4px] transition-colors"
              >
                Enable Invites
              </button>
            ) : (
              <button
                onClick={() => inviteLogic.setPauseDialogOpen(true)}
                className="px-4 py-2.5 text-sm font-medium text-[#da373c] bg-transparent border border-transparent hover:border-[#da373c]/50 hover:bg-[#da373c]/10 rounded-[4px] transition-colors"
              >
                Pause Invites
              </button>
            )}
            <button
              onClick={() => inviteLogic.setCreateDialogOpen(true)}
              className="px-4 py-2.5 text-sm font-medium text-white bg-[#5865F2] hover:bg-[#4752c4] rounded-[4px] transition-colors"
            >
              Create invite link
            </button>
          </div>
        </div>
      </div>

      <InvitesTable invites={inviteLogic.invites} onRevoke={inviteLogic.revokeInvite} />

      <PauseInvitesDialog
        open={inviteLogic.pauseDialogOpen}
        onOpenChange={inviteLogic.setPauseDialogOpen}
        initialPaused={inviteLogic.isInvitesPaused}
        onSave={inviteLogic.setIsInvitesPaused}
      />

      <CreateInviteDialog
        open={inviteLogic.createDialogOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen && !skipGenerateRef.current) {
            inviteLogic.generateNewInvite();
          }
          inviteLogic.setCreateDialogOpen(isOpen);
          if (!isOpen) skipGenerateRef.current = false; // reset
        }}
        friends={inviteLogic.friends}
        searchQuery={inviteLogic.searchFriendQuery}
        onSearchChange={inviteLogic.setSearchFriendQuery}
        onEditClick={() => {
          skipGenerateRef.current = true;
          inviteLogic.setCreateDialogOpen(false);
          setEditInviteOpen(true);
        }}
      />

      <EditInviteDialog
        open={editInviteOpen}
        onOpenChange={(isOpen) => {
          setEditInviteOpen(isOpen);
          if (!isOpen) {
            // Quay lại màn hình Create
            inviteLogic.setCreateDialogOpen(true);
          }
        }}
        onGenerate={() => {
          inviteLogic.generateNewInvite();
        }}
      />
    </div>
  );
};

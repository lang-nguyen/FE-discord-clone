import React from "react";
import { useMembers } from "../../../composables/members";
import { useRoles } from "../../../composables/roles";
import { MembersHeader } from "./MembersHeader";
import { MembersTable } from "./MembersTable";
import { BanMemberDialog } from "./BanMemberDialog";
import { PruneMembersDialog } from "./PruneMembersDialog";
import { ChangeNicknameDialog } from "./ChangeNicknameDialog";
import { BlockMemberDialog } from "./BlockMemberDialog";
import { TimeoutMemberDialog } from "./TimeoutMemberDialog";
import { KickMemberDialog } from "./KickMemberDialog";
import { TransferOwnershipDialog } from "./TransferOwnershipDialog";

export const ServerMembers = ({ serverId, serverName }) => {
  console.log("Rendering ServerMembers for:", serverName, "with ID:", serverId);
  
  const membersLogic = useMembers({ serverId, serverName });
  const { roles } = useRoles();

  return (
    <div className="flex-1 min-w-0">
      <MembersHeader
        showMembersInChannel={membersLogic.showMembersInChannel}
        onToggleShowMembers={() => membersLogic.setShowMembersInChannel(!membersLogic.showMembersInChannel)}
      />

      <MembersTable
        members={membersLogic.members}
        searchQuery={membersLogic.searchQuery}
        onSearchChange={membersLogic.setSearchQuery}
        sortMode={membersLogic.sortMode}
        onSortChange={membersLogic.changeSortMode}
        onTransferOwnership={membersLogic.openTransferDialog}
        onBanMember={membersLogic.openBanDialog}
        onChangeNickname={membersLogic.openChangeNicknameDialog}
        onBlockMember={membersLogic.openBlockDialog}
        onTimeoutMember={membersLogic.openTimeoutDialog}
        onKickMember={membersLogic.openKickDialog}
        onPrune={membersLogic.openPruneDialog}
        isLoading={membersLogic.isLoading}
        hasMore={membersLogic.hasMore}
        fetchNextPage={membersLogic.fetchNextPage}
      />

      <TransferOwnershipDialog
        open={membersLogic.transferDialogOpen}
        onOpenChange={membersLogic.closeTransferDialog}
        serverName={serverName}
        currentUser={{ name: "Current User", username: "currentuser" }}
        targetMember={membersLogic.transferTarget}
        acknowledged={membersLogic.transferAcknowledged}
        onAcknowledgedChange={membersLogic.setTransferAcknowledged}
        verificationStep={membersLogic.verificationStep}
        verificationCode={membersLogic.verificationCode}
        onVerificationCodeChange={membersLogic.setVerificationCode}
        onProceed={membersLogic.proceedToVerification}
        onConfirm={membersLogic.confirmTransfer}
      />

      <BanMemberDialog
        open={membersLogic.banDialogOpen}
        onOpenChange={membersLogic.closeBanDialog}
        targetMember={membersLogic.banTarget}
        onConfirm={membersLogic.confirmBan}
      />

      <PruneMembersDialog
        open={membersLogic.pruneDialogOpen}
        onOpenChange={membersLogic.closePruneDialog}
        serverName={serverName}
        onConfirm={membersLogic.confirmPrune}
        members={membersLogic.allMembers}
        roles={roles}
      />

      <ChangeNicknameDialog
        open={membersLogic.changeNicknameDialogOpen}
        onOpenChange={membersLogic.closeChangeNicknameDialog}
        member={membersLogic.changeNicknameTarget}
        onConfirm={membersLogic.confirmChangeNickname}
      />

      <BlockMemberDialog
        open={membersLogic.blockDialogOpen}
        onOpenChange={membersLogic.closeBlockDialog}
        targetMember={membersLogic.blockTarget}
        onConfirm={membersLogic.confirmBlock}
      />

      <TimeoutMemberDialog
        open={membersLogic.timeoutDialogOpen}
        onOpenChange={membersLogic.closeTimeoutDialog}
        targetMember={membersLogic.timeoutTarget}
        onConfirm={membersLogic.confirmTimeout}
      />

      <KickMemberDialog
        open={membersLogic.kickDialogOpen}
        onOpenChange={membersLogic.closeKickDialog}
        targetMember={membersLogic.kickTarget}
        onConfirm={membersLogic.confirmKick}
      />

      {membersLogic.toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#232428] border border-[#1e1f22] text-white px-4 py-3 rounded-[4px] shadow-lg flex items-center gap-3 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-5 h-5 rounded-full bg-[#23a559] flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <span className="text-[14px] font-medium">{membersLogic.toastMessage}</span>
        </div>
      )}
    </div>
  );
};

import { useMembers } from "@/features/servers/composables/members";
import { TransferOwnershipDialog } from "./TransferOwnershipDialog";
import { MembersHeader } from "./MembersHeader";
import { MembersTable } from "./MembersTable";
import { KickMemberDialog } from "./KickMemberDialog";

export const ServerMembers = ({ serverName }) => {
  const membersLogic = useMembers({ serverName });

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
        onTransferOwnership={membersLogic.openTransferDialog}
        onKickMember={membersLogic.openKickDialog}
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

      <KickMemberDialog
        open={membersLogic.kickDialogOpen}
        onOpenChange={membersLogic.closeKickDialog}
        member={membersLogic.kickTarget}
        reason={membersLogic.kickReason}
        onReasonChange={membersLogic.setKickReason}
        onKick={membersLogic.confirmKick}
      />
    </div>
  );
};

import { useMembers } from "@/features/servers/composables/members";
import { TransferOwnershipDialog } from "./TransferOwnershipDialog";
import { MembersHeader } from "./MembersHeader";
import { MembersTable } from "./MembersTable";
import { BanMemberDialog } from "./BanMemberDialog";
import { PruneMembersDialog } from "./PruneMembersDialog";
import { ChangeNicknameDialog } from "./ChangeNicknameDialog";
import { useRoles } from "@/features/servers/composables/roles";

export const ServerMembers = ({ serverName }) => {
  const membersLogic = useMembers({ serverName });
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
        sortOption={membersLogic.sortOption}
        onSortChange={membersLogic.setSortOption}
        onPruneClick={membersLogic.openPruneDialog}
        onTransferOwnership={membersLogic.openTransferDialog}
        onBanMember={membersLogic.openBanDialog}
        onChangeNickname={membersLogic.openChangeNicknameDialog}
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
        members={membersLogic.members}
        roles={roles}
      />

      <ChangeNicknameDialog
        open={membersLogic.changeNicknameDialogOpen}
        onOpenChange={membersLogic.closeChangeNicknameDialog}
        member={membersLogic.changeNicknameTarget}
        onConfirm={membersLogic.confirmChangeNickname}
      />
    </div>
  );
};

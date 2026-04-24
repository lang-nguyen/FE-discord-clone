import { DangerDialog } from "@/shared/components/ui/DangerDialog";

export const KickMemberDialog = ({
  open,
  onOpenChange,
  member,
  reason,
  onReasonChange,
  onKick,
}) => {
  if (!member) return null;

  return (
    <DangerDialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Kick ${member.username} from Server`}
      description={
        <p>
          Are you sure you want to kick <span className="font-semibold text-white">@{member.name || member.username}</span> from the server? They will be able to re-join again with a new invite.
        </p>
      }
      inputLabel="Reason for Kick"
      inputValue={reason}
      onInputValueChange={onReasonChange}
      onConfirm={() => onKick(reason)}
      confirmText="Kick"
      isConfirmDisabled={false}
    />
  );
};

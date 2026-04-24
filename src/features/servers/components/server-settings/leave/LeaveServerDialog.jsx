import { DangerDialog } from "@/shared/components/ui/DangerDialog";

export const LeaveServerDialog = ({
  open,
  onOpenChange,
  serverName,
  onLeave,
}) => {
  return (
    <DangerDialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Leave '${serverName}'`}
      description={
        <p>
          Are you sure you want to leave{" "}
          <span className="font-semibold text-white">{serverName}</span>?
          You won't be able to re-join this server unless you are re-invited.
        </p>
      }
      onConfirm={onLeave}
      confirmText="Leave Server"
      cancelText="Cancel"
    />
  );
};

import { DangerDialog } from "@/shared/components/ui/DangerDialog";

export const DeleteServerDialog = ({
  open,
  onOpenChange,
  serverName,
  confirmName,
  onConfirmNameChange,
  isMatch,
  onDelete,
}) => {
  return (
    <DangerDialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Delete '${serverName}'`}
      description={
        <p>
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white">{serverName}</span>?
          This action cannot be undone.
        </p>
      }
      inputLabel="Enter server name"
      inputValue={confirmName}
      onInputValueChange={onConfirmNameChange}
      onConfirm={onDelete}
      confirmText="Delete Server"
      isConfirmDisabled={!isMatch}
    />
  );
};

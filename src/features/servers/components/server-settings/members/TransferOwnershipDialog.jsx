import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/Dialog";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { MemberAvatar } from "./MemberAvatar";

export const TransferOwnershipDialog = ({
  open,
  onOpenChange,
  serverName,
  currentUser,
  targetMember,
  acknowledged,
  onAcknowledgedChange,
  verificationStep,
  verificationCode,
  onVerificationCodeChange,
  onProceed,
  onConfirm,
}) => {
  if (!targetMember) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#313338] border-none max-w-[480px] p-0 gap-0 rounded-xl">
        {verificationStep ? (
          <>

            <DialogHeader className="px-6 pt-2 pb-0 text-center">
              <DialogTitle className="text-white text-xl font-semibold select-none">
                Transfer Ownership
              </DialogTitle>
            </DialogHeader>

            <div className="px-6 py-4">
              <p className="text-sm text-gray-400 leading-relaxed text-center select-none">
                Check your email: we've sent you a verification code. Enter it
                here to verify you're really you.
              </p>

              <div className="mt-5">
                <Input
                  label="Verification Code"
                  value={verificationCode}
                  onChange={(e) => onVerificationCodeChange(e.target.value)}
                  className="bg-[#1e1f22]"
                />
              </div>

              <p className="mt-3 text-sm">
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                  Didn't receive a code or it expired? Resend it.
                </span>
              </p>
            </div>

            <DialogFooter className="px-6 py-4 border-t border-[#3b3d44]/50 !flex !flex-row !justify-end gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-[#404249] rounded-md px-6"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="bg-[#da373c] hover:bg-[#a12828] rounded-md px-6 disabled:opacity-50"
                onClick={onConfirm}
                disabled={!verificationCode}
              >
                Transfer Ownership
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            {/* Acknowledgment Step */}
            <DialogHeader className="px-6 pt-5 pb-0">
              <DialogTitle className="text-white text-xl font-semibold select-none">
                Transfer Ownership
              </DialogTitle>
            </DialogHeader>

            <div className="px-6 py-4">
              <p className="text-sm text-gray-400 leading-relaxed select-none">
                This will transfer ownership of{" "}
                <span className="font-semibold text-white">{serverName}</span> to{" "}
                <span className="font-semibold text-white">{targetMember.username}</span>.
                This cannot be undone!
              </p>

              {/* Avatar exchange illustration */}
              <div className="flex items-center justify-center gap-2 my-6">
                <MemberAvatar
                  member={currentUser}
                  className="w-16 h-16 rounded-full border-2 border-dashed border-[#5865f2] bg-[#5865f2] shrink-0"
                  fallbackClassName="text-2xl font-bold bg-transparent"
                />
                <MemberAvatar
                  member={targetMember}
                  className="w-16 h-16 rounded-full border-2 border-[#3b3d44] bg-[#2b2d31] shrink-0"
                  fallbackClassName="text-2xl font-bold bg-transparent"
                />
              </div>

              {/* Acknowledgment checkbox */}
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => onAcknowledgedChange(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded bg-[#1e1f22] border-gray-500 accent-[#5865f2] cursor-pointer"
                />
                <span className="text-sm text-gray-300 leading-relaxed">
                  I acknowledge that by transferring ownership of this server to{" "}
                  <span className="font-semibold text-white">{targetMember.username}</span>,
                  it officially belongs to them.
                </span>
              </label>
            </div>

            <DialogFooter className="px-6 py-4 border-t border-[#3b3d44]/50 !flex !flex-row !justify-end gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-[#404249] rounded-md px-6"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="bg-[#da373c] hover:bg-[#a12828] rounded-md px-6 disabled:opacity-50"
                onClick={onProceed}
                disabled={!acknowledged}
              >
                Transfer Ownership
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

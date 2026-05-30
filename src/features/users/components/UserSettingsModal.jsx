import { KeyRound, LogOut, Save, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { PasswordInput } from "@/features/users/components/PasswordInput";
import { useUserSettingsModal } from "@/features/users/composables/user-settings-modal";

export function UserSettingsModal({ open, onOpenChange }) {
  const {
    activeSection,
    error,
    form,
    handleChangePassword,
    handleLogout,
    handleSubmit,
    isLoading,
    isPasswordLoading,
    navItemClass,
    passwordForm,
    passwordMessage,
    setActiveSection,
    togglePasswordVisibility,
    updateField,
    updatePasswordField,
    visiblePasswords,
  } = useUserSettingsModal({ open, onOpenChange });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-none bg-[#313338] p-0 text-gray-100">
        <DialogHeader className="border-b border-black/20 px-6 py-4">
          <DialogTitle>User Settings</DialogTitle>
        </DialogHeader>

        <div className="grid gap-0 sm:grid-cols-[180px_1fr]">
          <aside className="border-r border-black/20 bg-[#2B2D31] p-3">
            <button
              type="button"
              onClick={() => setActiveSection("profile")}
              className={navItemClass("profile")}
            >
              <User className="h-4 w-4" />
              My Account
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("password")}
              className={navItemClass("password")}
            >
              <KeyRound className="h-4 w-4" />
              Password
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </aside>

          {activeSection === "profile" ? (
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <Input
                label="Display Name"
                value={form.displayName}
                required
                onChange={(event) => updateField("displayName", event.target.value)}
              />

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-300">
                  Bio
                </label>
                <textarea
                  className="min-h-[88px] w-full resize-none rounded-md border border-transparent bg-[#202225] px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus-visible:border-[#5865f2] focus-visible:outline-none"
                  value={form.bio}
                  maxLength={2000}
                  onChange={(event) => updateField("bio", event.target.value)}
                />
              </div>

              <Input
                label="Avatar URL"
                value={form.avatarUrl}
                onChange={(event) => updateField("avatarUrl", event.target.value)}
              />

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-300">
                  Note
                </label>
                <textarea
                  className="min-h-[72px] w-full resize-none rounded-md border border-transparent bg-[#202225] px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus-visible:border-[#5865f2] focus-visible:outline-none"
                  value={form.note}
                  maxLength={1000}
                  onChange={(event) => updateField("note", event.target.value)}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
                <Input
                  label="Banner Color"
                  type="color"
                  value={form.bannerColor}
                  onChange={(event) => updateField("bannerColor", event.target.value)}
                />
                <Input
                  label="Banner URL"
                  value={form.bannerUrl}
                  onChange={(event) => updateField("bannerUrl", event.target.value)}
                />
              </div>

              {error && <p className="text-sm text-red-300">{error}</p>}

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  <Save className="h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4 p-6">
              <PasswordInput
                label="Current Password"
                visible={visiblePasswords.currentPassword}
                required
                value={passwordForm.currentPassword}
                onToggle={() => togglePasswordVisibility("currentPassword")}
                onChange={(event) => updatePasswordField("currentPassword", event.target.value)}
              />
              <PasswordInput
                label="New Password"
                visible={visiblePasswords.newPassword}
                required
                minLength={8}
                value={passwordForm.newPassword}
                onToggle={() => togglePasswordVisibility("newPassword")}
                onChange={(event) => updatePasswordField("newPassword", event.target.value)}
              />
              <PasswordInput
                label="Confirm New Password"
                visible={visiblePasswords.confirmPassword}
                required
                minLength={8}
                value={passwordForm.confirmPassword}
                onToggle={() => togglePasswordVisibility("confirmPassword")}
                onChange={(event) => updatePasswordField("confirmPassword", event.target.value)}
              />

              {passwordMessage && (
                <p className={`text-sm ${passwordMessage.includes("successfully") ? "text-green-300" : "text-red-300"}`}>
                  {passwordMessage}
                </p>
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={isPasswordLoading}>
                  <KeyRound className="h-4 w-4" />
                  {isPasswordLoading ? "Changing..." : "Change Password"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { KeyRound, LogOut, Save, User, Paintbrush } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/Dialog";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { PasswordInput } from "@/features/users/components/PasswordInput";
import { useUserSettingsModal } from "@/features/users/hooks/useUserSettingsModal";
import { useTheme } from "@/shared/theme/ThemeProvider";

export function UserSettingsModal({ open, onOpenChange }) {
  const {
    activeSection,
    avatarFile,
    avatarUploadMessage,
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
    updateAvatarFile,
    updateField,
    updatePasswordField,
    visiblePasswords,
  } = useUserSettingsModal({ open, onOpenChange });

  const { theme: activeTheme, themes, setTheme } = useTheme();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-none bg-chat-bg p-0 text-primary-text">
        <DialogHeader className="border-b border-black/20 px-6 py-4">
          <DialogTitle>User Settings</DialogTitle>
        </DialogHeader>

        <div className="grid gap-0 sm:grid-cols-[180px_1fr]">
          <aside className="border-r border-black/10 bg-nav-sidebar-bg p-3">
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
              onClick={() => setActiveSection("appearance")}
              className={navItemClass("appearance")}
            >
              <Paintbrush className="h-4 w-4" />
              Appearance
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

          {activeSection === "profile" && (
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <Input
                label="Display Name"
                value={form.displayName}
                required
                onChange={(event) => updateField("displayName", event.target.value)}
              />

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wide text-muted-text">
                  Bio
                </label>
                <textarea
                  className="min-h-[88px] w-full resize-none rounded-md border border-transparent bg-input-bg px-3 py-2 text-sm text-primary-text placeholder:text-muted-text focus-visible:border-[#5865f2] focus-visible:outline-none"
                  value={form.bio}
                  maxLength={2000}
                  onChange={(event) => updateField("bio", event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wide text-muted-text">
                  Upload Avatar
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={(event) => updateAvatarFile(event.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-muted-text file:mr-3 file:rounded-md file:border-0 file:bg-[#5865F2] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#4752C4]"
                />
                {(avatarFile || avatarUploadMessage) && (
                  <p
                    className={`text-xs ${avatarUploadMessage.includes("Unable") ? "text-red-300" : "text-muted-text"}`}
                  >
                    {avatarUploadMessage || avatarFile?.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wide text-muted-text">
                  Note
                </label>
                <textarea
                  className="min-h-[72px] w-full resize-none rounded-md border border-transparent bg-input-bg px-3 py-2 text-sm text-primary-text placeholder:text-muted-text focus-visible:border-[#5865f2] focus-visible:outline-none"
                  value={form.note}
                  maxLength={1000}
                  onChange={(event) => updateField("note", event.target.value)}
                />
              </div>

              <Input
                label="Banner Color"
                type="color"
                value={form.bannerColor}
                onChange={(event) => updateField("bannerColor", event.target.value)}
              />

              {error && <p className="text-sm text-red-300">{error}</p>}

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  <Save className="h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          )}

          {activeSection === "password" && (
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
                <p
                  className={`text-sm ${passwordMessage.includes("successfully") ? "text-green-300" : "text-red-300"}`}
                >
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

          {activeSection === "appearance" && (
            <div className="space-y-4 p-6">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-muted-text uppercase tracking-wider mb-4">
                  Choose App Theme
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTheme(t.key)}
                      className={`px-3 py-3 rounded-lg text-xs font-bold transition-all truncate border border-transparent ${
                        activeTheme === t.key
                          ? "bg-[#5865F2] text-white shadow-md border-white/20"
                          : "bg-input-bg text-muted-text hover:text-primary-text hover:bg-hover-bg"
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

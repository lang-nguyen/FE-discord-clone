import { MessageCircle, Server, Settings, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { Button } from "@/shared/components/ui/Button";
import { ProfileInfoBlock } from "@/features/users/components/ProfileInfoBlock";
import { UserAvatar } from "@/features/users/components/UserAvatar";
import { UserBanner } from "@/features/users/components/UserBanner";
import { UserSettingsModal } from "@/features/users/components/UserSettingsModal";
import {
  TAB_JOINED_SERVERS,
  TAB_OWNED_SERVERS,
  useUserProfileModal,
} from "@/features/users/hooks/useUserProfileModal";

export function UserProfileModal({ open, onOpenChange, user, profile }) {
  const {
    activeTab,
    bannerStyle,
    displayName,
    emptyServerText,
    isSettingsOpen,
    memberSince,
    openSettings,
    serversError,
    serversLoading,
    setActiveTab,
    setIsSettingsOpen,
    tabs,
    username,
    visibleServers,
  } = useUserProfileModal({ open, onOpenChange, user, profile });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="h-[min(800px,calc(100vh-28px))] w-[min(960px,calc(100vw-24px))] max-w-none overflow-hidden border border-white/10 bg-[#1f2025] p-0 text-gray-100 shadow-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>{displayName}</DialogTitle>
          </DialogHeader>

          <div className="grid h-full grid-cols-1 md:grid-cols-[400px_1fr]">
            <section className="bg-[#27282e]">
              <div className="mx-8 mt-12 overflow-hidden rounded-[16px] bg-[#24252b]">
                <UserBanner className="h-36 bg-cover bg-center" style={bannerStyle} />
                <div className="px-8 pb-8">
                  <div className="-mt-16">
                    <UserAvatar
                      avatarUrl={profile?.avatarUrl}
                      displayName={displayName}
                      status="offline"
                      className="h-32 w-32 border-8 border-[#24252b]"
                      fallbackClassName="text-4xl"
                    />
                  </div>

                  <div className="mt-5 min-w-0">
                    <h2 className="break-words text-2xl font-bold leading-tight">{displayName}</h2>
                    <p className="mt-1 truncate text-sm text-gray-300">{username}</p>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <Button type="button" className="h-8 rounded-[4px] bg-[#5865F2] px-3 text-sm hover:bg-[#4752C4]" onClick={openSettings}>
                      <Settings className="h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button type="button" size="icon" variant="ghost" className="h-8 w-8 rounded-[4px] bg-[#33343b] text-white hover:bg-[#3c3d45]">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-6 space-y-5 text-sm">
                    <ProfileInfoBlock title="Member Since" muted={false}>
                      {memberSince}
                    </ProfileInfoBlock>
                    <ProfileInfoBlock title="About Me" onClick={openSettings}>
                      {profile?.bio || "Click edit profile to add a bio."}
                    </ProfileInfoBlock>
                    <ProfileInfoBlock title="Note" muted onClick={openSettings}>
                      {profile?.note || "Click edit profile to add a note."}
                    </ProfileInfoBlock>
                  </div>
                </div>
              </div>
            </section>

            <section className="min-h-0 p-8">
              <div className="flex border-b border-white/10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative h-12 px-4 text-sm font-semibold transition-colors ${
                      activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-white" />}
                  </button>
                ))}
              </div>

              {activeTab === TAB_JOINED_SERVERS || activeTab === TAB_OWNED_SERVERS ? (
                <ServerList servers={visibleServers} loading={serversLoading} error={serversError} emptyText={emptyServerText} />
              ) : (
                <div className="flex h-[420px] flex-col items-center justify-center text-center text-gray-400">
                  <UserPlus className="mb-3 h-8 w-8" />
                  <p className="text-sm">Nothing to show here yet.</p>
                </div>
              )}
            </section>
          </div>
        </DialogContent>
      </Dialog>

      <UserSettingsModal open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
}

function ServerList({ servers, loading, error, emptyText }) {
  if (loading) {
    return (
      <div className="mt-4 space-y-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/10" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-40 rounded bg-white/10" />
              <div className="h-3 w-28 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[420px] flex-col items-center justify-center text-center text-gray-400">
        <Server className="mb-3 h-8 w-8" />
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!servers.length) {
    return (
      <div className="flex h-[420px] flex-col items-center justify-center text-center text-gray-400">
        <Server className="mb-3 h-8 w-8" />
        <p className="text-sm">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-5">
      {servers.map((server) => (
        <div key={server.id} className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cover bg-center text-xs font-bold text-white"
            style={{ backgroundColor: server.color }}
          >
            {server.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-medium text-white">{server.name}</p>
            <p className="truncate text-sm text-gray-400">{server.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

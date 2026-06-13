import { useState } from "react";
import { useSelector } from "react-redux";
import UserPanel from "@/layouts/components/Sidebar/UserPanel";

export function UserPanelContainer({ onOpenProfile, onOpenSettings }) {
  const { user, profile } = useSelector((state) => state.auth);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  return (
    <UserPanel
      user={{
        username: profile?.displayName || user?.username || "Discord User",
        statusText: "Truc tuyen",
        avatarUrl: profile?.avatarUrl,
        onlineStatus: "online",
      }}
      isMuted={isMuted}
      isDeafened={isDeafened}
      onToggleMute={() => setIsMuted((value) => !value)}
      onToggleDeafen={() => setIsDeafened((value) => !value)}
      onClickProfile={onOpenProfile}
      onClickSettings={onOpenSettings}
    />
  );
}

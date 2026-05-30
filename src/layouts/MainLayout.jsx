import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserPanel from '@/layouts/components/Sidebar/UserPanel';
import { UserProfileModal } from '@/features/users/components/UserProfileModal';
import { UserSettingsModal } from '@/features/users/components/UserSettingsModal';

export function MainLayout() {
    const { user, profile } = useSelector((state) => state.auth);
    const [isMuted, setIsMuted] = useState(false);
    const [isDeafened, setIsDeafened] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const panelUser = {
        username: profile?.displayName || user?.username || "Discord User",
        statusText: "Truc tuyen",
        avatarUrl: profile?.avatarUrl,
        onlineStatus: "online",
    };

    return (
        <div className="flex h-screen w-full">
            {/* ServerSidebar */}
            <div className="w-[72px] bg-[#1E1F22] flex-shrink-0 flex flex-col items-center py-3">
                {/* Placeholder for server icons */}
            </div>

            {/* NavigationSidebar */}
            <div className="relative w-[240px] bg-[#2B2D31] flex-shrink-0 flex flex-col">
                <div className="flex-1 px-3 py-4">
                    <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Direct Messages
                    </div>
                    <div className="rounded-md bg-white/5 px-2 py-2 text-sm text-gray-200">
                        Friends
                    </div>
                </div>

                <UserPanel
                    user={panelUser}
                    isMuted={isMuted}
                    isDeafened={isDeafened}
                    onToggleMute={() => setIsMuted((value) => !value)}
                    onToggleDeafen={() => setIsDeafened((value) => !value)}
                    onClickProfile={() => setIsProfileOpen((value) => !value)}
                    onClickSettings={() => setIsSettingsOpen(true)}
                />
            </div>

            {/* MainContent */}
            <div className="flex-1 bg-[#313338] flex flex-col">
                <Outlet />
            </div>

            <UserSettingsModal open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
            <UserProfileModal
                open={isProfileOpen}
                onOpenChange={setIsProfileOpen}
                user={user}
                profile={profile}
            />
        </div>
    );
}

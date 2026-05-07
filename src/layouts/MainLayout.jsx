import React from 'react';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
    return (
        <div className="flex h-screen w-full">
            {/* ServerSidebar */}
            <div className="w-[72px] bg-[#1E1F22] flex-shrink-0 flex flex-col items-center py-3">
                {/* Placeholder for server icons */}
            </div>

            {/* NavigationSidebar */}
            <div className="w-[240px] bg-[#2B2D31] flex-shrink-0 flex flex-col">
                {/* Placeholder for channels / DMs list */}
            </div>

            {/* MainContent */}
            <div className="flex-1 bg-[#313338] flex flex-col">
                <Outlet />
            </div>
        </div>
    );
}

import React from 'react';
import { Outlet } from 'react-router-dom';
import authBg from '../assets/auth-bg.png';

export function AuthLayout() {
    return (
        <div
            className="flex min-h-screen items-center justify-center bg-gray-900 bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${authBg})` }}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

            <div className="relative z-10 w-full max-w-[480px] rounded-2xl bg-gray-800/80 p-8 shadow-2xl backdrop-blur-md border border-gray-700/50">
                <Outlet />
            </div>
        </div>
    );
}

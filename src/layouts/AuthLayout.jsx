import React from 'react';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
    return (
        <div
            className="flex min-h-screen items-center justify-center bg-gray-900 bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')` }}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            <div className="relative z-10 w-full min-h-screen sm:min-h-0 sm:max-w-[480px] sm:rounded-2xl bg-[#313338] p-6 sm:p-8 shadow-2xl flex flex-col justify-center">
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

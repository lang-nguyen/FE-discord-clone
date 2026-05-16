import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/env';

export function getAccessToken() {
    return (
        localStorage.getItem('access_token') ||
        import.meta.env.VITE_DEV_ACCESS_TOKEN ||
        null
    );
}

export const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
        const token = getAccessToken();
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

import { getAccessToken } from '@/api/baseApi';

/** Tự gắn dev token từ .env khi chưa login (chỉ dùng local dev). */
export function seedDevAuth() {
    const devToken = import.meta.env.VITE_DEV_ACCESS_TOKEN;
    if (devToken && !getAccessToken()) {
        localStorage.setItem('access_token', devToken);
    }
}

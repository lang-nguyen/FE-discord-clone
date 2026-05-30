export const AUTH_STORAGE_KEYS = {
  accessToken: "discord_access_token",
  refreshToken: "discord_refresh_token",
  authUser: "discord_auth_user",
};

export function getStoredAccessToken() {
  return localStorage.getItem(AUTH_STORAGE_KEYS.accessToken);
}

export function getStoredRefreshToken() {
  return localStorage.getItem(AUTH_STORAGE_KEYS.refreshToken);
}

export function getStoredAuthUser() {
  const value = localStorage.getItem(AUTH_STORAGE_KEYS.authUser);
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function persistAuthSession({ accessToken, refreshToken, user, profile }) {
  if (accessToken) {
    localStorage.setItem(AUTH_STORAGE_KEYS.accessToken, accessToken);
  }

  if (refreshToken) {
    localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, refreshToken);
  }

  if (user !== undefined || profile !== undefined) {
    const current = getStoredAuthUser() ?? {};
    localStorage.setItem(AUTH_STORAGE_KEYS.authUser, JSON.stringify({
      user: user !== undefined ? user : current.user ?? null,
      profile: profile !== undefined ? profile : current.profile ?? null,
    }));
  }
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_STORAGE_KEYS.accessToken);
  localStorage.removeItem(AUTH_STORAGE_KEYS.refreshToken);
  localStorage.removeItem(AUTH_STORAGE_KEYS.authUser);
}

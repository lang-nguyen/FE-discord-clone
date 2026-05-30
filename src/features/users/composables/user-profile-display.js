export function getUserDisplayName(user, profile) {
  return profile?.displayName || user?.username || "Discord User";
}

export function getUsername(user, displayName) {
  return user?.username || displayName;
}

export function getProfileBannerStyle(profile, fallbackColor = "#5865F2") {
  return profile?.bannerUrl
    ? { backgroundImage: `url(${profile.bannerUrl})` }
    : { backgroundColor: profile?.bannerColor || fallbackColor };
}

export function formatMemberSince(createdAt, fallback = "22 May 2024") {
  if (!createdAt) return fallback;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(createdAt));
}

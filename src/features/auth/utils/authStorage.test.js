import { describe, expect, it } from "vitest";
import {
  clearAuthSession,
  getStoredAccessToken,
  getStoredAuthUser,
  persistAuthSession,
} from "@/features/auth/utils/authStorage";

describe("authStorage", () => {
  it("persists and clears a session", () => {
    persistAuthSession({
      accessToken: "access",
      refreshToken: "refresh",
      user: { id: "user-1" },
      profile: { displayName: "Minh" },
    });

    expect(getStoredAccessToken()).toBe("access");
    expect(getStoredAuthUser()).toEqual({
      user: { id: "user-1" },
      profile: { displayName: "Minh" },
    });

    clearAuthSession();
    expect(getStoredAccessToken()).toBeNull();
    expect(getStoredAuthUser()).toBeNull();
  });
});

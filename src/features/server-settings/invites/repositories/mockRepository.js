import { createSessionRepository } from "@/features/server-settings/repositories/createSessionRepository";

export const MOCK_FRIENDS = Object.freeze(
  Array.from({ length: 8 }, (_, index) => {
    const id = String(index + 1);
    return {
      id,
      username: `user${id}`,
      displayName: `user${id}`,
      avatar: `https://i.pravatar.cc/150?u=${id}`,
    };
  })
);

const INITIAL_INVITES = [
  {
    id: "1",
    inviter: {
      name: "sweet6th8",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    channel: "general",
    code: "c6mEsCjm",
    uses: 0,
    expiresAt: Date.now() + 90106000,
    roles: [],
  },
];

export function createInvitesMockRepository(serverId) {
  return createSessionRepository({
    storageKey: `server-settings:${serverId}:invites`,
    initialItems: INITIAL_INVITES,
  });
}

import { createSessionRepository } from "@/features/server-settings/repositories/createSessionRepository";

const BASE_MEMBERS = [
  {
    id: "1",
    username: "thien",
    name: "thien",
    memberSince: "Aug 10, 2023",
    joinedDiscord: "May 5, 2020",
    joinMethod: "Invite",
    roles: ["role-1"],
    lastSeenTs: Date.now() - 40 * 86400000,
    isTimeout: false,
    timeoutUntil: null,
    isBlocked: false,
  },
  {
    id: "2",
    username: "nieahh_04",
    name: "nieahh_04",
    memberSince: "Jan 15, 2024",
    joinedDiscord: "Dec 12, 2021",
    joinMethod: "Invite",
    roles: ["role-2"],
    lastSeenTs: Date.now() - 20 * 86400000,
    isTimeout: false,
    timeoutUntil: null,
    isBlocked: false,
  },
  ...Array.from({ length: 48 }, (_, index) => {
    const id = String(index + 3);
    return {
      id,
      username: `user_${id}`,
      name: `User ${id}`,
      memberSince: "Feb 1, 2024",
      joinedDiscord: "Jan 1, 2022",
      joinMethod: "Invite",
      roles: [],
      lastSeenTs: Date.now() - Number(id) * 100000000,
      isTimeout: false,
      timeoutUntil: null,
      isBlocked: false,
    };
  }),
];

export function createMembersMockRepository(serverId) {
  return createSessionRepository({
    storageKey: `server-settings:${serverId}:members`,
    initialItems: BASE_MEMBERS,
  });
}

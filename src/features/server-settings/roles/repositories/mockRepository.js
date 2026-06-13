import { createSessionRepository } from "@/features/server-settings/repositories/createSessionRepository";

const INITIAL_ROLES = [
  {
    id: "role-1",
    name: "new role",
    color: "#99aab5",
    memberCount: 0,
    isSeparate: false,
    isMentionable: false,
  },
  {
    id: "role-2",
    name: "new role",
    color: "#99aab5",
    memberCount: 0,
    isSeparate: false,
    isMentionable: false,
  },
];

export function createRolesMockRepository(serverId) {
  return createSessionRepository({
    storageKey: `server-settings:${serverId}:roles`,
    initialItems: INITIAL_ROLES,
  });
}

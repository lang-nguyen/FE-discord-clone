import { createSessionRepository } from "@/features/server-settings/repositories/createSessionRepository";

const INITIAL_BANS = [
  {
    id: "101",
    username: "spammer123",
    name: "Spammer",
    reason: "Spamming in general chat",
  },
  {
    id: "102",
    username: "troll_master",
    name: "Troll Master",
    reason: "Harassing members",
  },
];

export function createBansMockRepository(serverId) {
  return createSessionRepository({
    storageKey: `server-settings:${serverId}:bans`,
    initialItems: INITIAL_BANS,
  });
}

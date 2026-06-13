import { createHttpRepository } from "@/features/server-settings/repositories/httpRepository";
import { createMembersMockRepository } from "@/features/server-settings/members/repositories/mockRepository";
import { createBansMockRepository } from "@/features/server-settings/bans/repositories/mockRepository";
import { createRolesMockRepository } from "@/features/server-settings/roles/repositories/mockRepository";
import { createInvitesMockRepository } from "@/features/server-settings/invites/repositories/mockRepository";

const mockFactories = {
  members: createMembersMockRepository,
  bans: createBansMockRepository,
  roles: createRolesMockRepository,
  invites: createInvitesMockRepository,
};

export function getSettingsRepository(domain, serverId) {
  if (import.meta.env.VITE_SETTINGS_REPOSITORY === "http") {
    return createHttpRepository(`/api/servers/${serverId}/${domain}`);
  }

  return mockFactories[domain](serverId);
}

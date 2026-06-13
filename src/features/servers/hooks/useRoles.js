import { useEffect, useMemo, useState } from "react";
import { getSettingsRepository } from "@/features/server-settings/repositories/getRepository";

export const STANDARD_COLORS = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#e91e63",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#95a5a6",
  "#607d8b",
  "#11806a",
  "#1f8b4c",
  "#206694",
  "#71368a",
  "#ad1457",
  "#c27c0e",
  "#a84300",
  "#992d22",
  "#979c9f",
  "#546e7a",
];

export function useRoles(serverId = "default") {
  const repository = useMemo(() => getSettingsRepository("roles", serverId), [serverId]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    repository.list().then(setRoles);
  }, [repository]);

  const createRole = () => {
    const role = {
      id: `role-${crypto.randomUUID?.() || Date.now()}`,
      name: "new role",
      color: "#99aab5",
      memberCount: 0,
      isSeparate: false,
      isMentionable: false,
    };
    setRoles((current) => [role, ...current]);
    repository.create(role);
    return role.id;
  };

  const updateRole = (id, updates) => {
    setRoles((current) => current.map((role) => (role.id === id ? { ...role, ...updates } : role)));
    repository.update(id, updates);
  };

  const deleteRole = (id) => {
    setRoles((current) => current.filter((role) => role.id !== id));
    repository.remove(id);
  };

  return {
    roles,
    getRole: (id) => roles.find((role) => role.id === id),
    createRole,
    updateRole,
    deleteRole,
    STANDARD_COLORS,
  };
}

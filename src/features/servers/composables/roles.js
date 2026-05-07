import { useState, useCallback } from "react";

// Discord standard color palette for roles
export const STANDARD_COLORS = [
  "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#e91e63", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#607d8b",
  "#11806a", "#1f8b4c", "#206694", "#71368a", "#ad1457", "#c27c0e", "#a84300", "#992d22", "#979c9f", "#546e7a"
];

const INITIAL_ROLES = [
  { id: "role-1", name: "new role", color: "#99aab5", memberCount: 0, isSeparate: false, isMentionable: false },
  { id: "role-2", name: "new role", color: "#99aab5", memberCount: 0, isSeparate: false, isMentionable: false },
];

export function useRoles() {
  const [roles, setRoles] = useState(INITIAL_ROLES);

  const createRole = useCallback(() => {
    const newRole = {
      id: `role-${Date.now()}`,
      name: "new role",
      color: "#99aab5",
      memberCount: 0,
      isSeparate: false,
      isMentionable: false,
    };
    // Put new role at the top (under @everyone conceptually)
    setRoles(prev => [newRole, ...prev]);
    return newRole.id;
  }, []);

  const updateRole = useCallback((id, updates) => {
    setRoles(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  }, []);

  const deleteRole = useCallback((id) => {
    setRoles(prev => prev.filter(r => r.id !== id));
  }, []);

  const getRole = useCallback((id) => {
    return roles.find(r => r.id === id);
  }, [roles]);

  return {
    roles,
    getRole,
    createRole,
    updateRole,
    deleteRole,
    STANDARD_COLORS
  };
}

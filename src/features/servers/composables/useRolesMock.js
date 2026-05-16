import { useState, useCallback } from "react";
import { mapRoleFromApi, mapRoleToCreateBody, STANDARD_COLORS } from "./roleMappers";

function createInitialMockRoles(serverId) {
    return [
        mapRoleFromApi({
            id: "00000000-0000-0000-0000-000000000001",
            serverId,
            name: "@everyone",
            colorHex: "#99aab5",
            position: 0,
            permissions: 0,
            isDefault: true,
            hoist: false,
            mentionable: false,
        }),
        mapRoleFromApi({
            id: "00000000-0000-0000-0000-000000000002",
            serverId,
            name: "Moderator",
            colorHex: "#e74c3c",
            position: 1,
            permissions: 32,
            isDefault: false,
            hoist: false,
            mentionable: true,
        }),
    ].map((r) => ({ ...r, memberCount: r.isDefault ? 10 : 3 }));
}

export function useRolesMock(serverId) {
    const [roles, setRoles] = useState(() => createInitialMockRoles(serverId));

    const getRole = useCallback((id) => roles.find((r) => r.id === id), [roles]);

    const createRole = useCallback(async () => {
        const newId = crypto.randomUUID?.() ?? `role-${Date.now()}`;
        const newRole = mapRoleFromApi({
            id: newId,
            serverId,
            ...mapRoleToCreateBody(),
            position: roles.length,
            isDefault: false,
        });
        setRoles((prev) => [...prev, { ...newRole, memberCount: 0 }]);
        return newId;
    }, [roles.length, serverId]);

    const updateRole = useCallback(async (id, draft) => {
        setRoles((prev) => prev.map((r) => (r.id === id ? { ...r, ...draft } : r)));
        return true;
    }, []);

    const deleteRole = useCallback(async (id) => {
        const role = roles.find((r) => r.id === id);
        if (!role || role.isDefault) return false;
        setRoles((prev) => prev.filter((r) => r.id !== id));
        return true;
    }, [roles]);

    const reorderRole = useCallback(async () => true, []);

    return {
        roles,
        getRole,
        createRole,
        updateRole,
        deleteRole,
        reorderRole,
        isLoading: false,
        isError: false,
        isCreating: false,
        isUpdating: false,
        isMockMode: true,
        STANDARD_COLORS,
    };
}

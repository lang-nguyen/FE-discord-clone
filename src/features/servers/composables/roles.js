import { useMemo, useCallback } from "react";
import { USE_MOCK_API } from "@/config/env";
import {
    mapRoleFromApi,
    mapRoleToCreateBody,
    mapRoleToUpdateBody,
    STANDARD_COLORS,
} from "./roleMappers";
import {
    useGetRolesQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation,
    useReorderRoleMutation,
} from "@/api/roleApi";
import { useRolesMock } from "./useRolesMock";

export { mapRoleFromApi, mapRoleToCreateBody, mapRoleToUpdateBody, STANDARD_COLORS };

function useRolesApi(serverId) {
    const { data: fetchedRoles = [], isLoading, isError } = useGetRolesQuery(serverId, {
        skip: !serverId || USE_MOCK_API,
    });
    const [createRoleApi, { isLoading: isCreating }] = useCreateRoleMutation();
    const [updateRoleApi, { isLoading: isUpdating }] = useUpdateRoleMutation();
    const [deleteRoleApi] = useDeleteRoleMutation();
    const [reorderRoleApi] = useReorderRoleMutation();

    const roles = useMemo(() => {
        return [...fetchedRoles]
            .map(mapRoleFromApi)
            .sort((a, b) => a.position - b.position);
    }, [fetchedRoles]);

    const getRole = useCallback((id) => roles.find((r) => r.id === id), [roles]);

    const createRole = useCallback(async () => {
        try {
            const result = await createRoleApi({
                serverId,
                data: mapRoleToCreateBody(),
            }).unwrap();
            return result.roleId;
        } catch (err) {
            console.error("Failed to create role:", err);
            return null;
        }
    }, [createRoleApi, serverId]);

    const updateRole = useCallback(async (id, draft) => {
        const original = getRole(id);
        if (!original) return false;

        const body = mapRoleToUpdateBody(draft, original);
        if (Object.keys(body).length === 0) return true;

        try {
            await updateRoleApi({ serverId, roleId: id, data: body }).unwrap();
            return true;
        } catch (err) {
            console.error("Failed to update role:", err);
            return false;
        }
    }, [updateRoleApi, serverId, getRole]);

    const deleteRole = useCallback(async (id) => {
        const role = getRole(id);
        if (!role || role.isDefault) return false;

        try {
            await deleteRoleApi({ serverId, roleId: id }).unwrap();
            return true;
        } catch (err) {
            console.error("Failed to delete role:", err);
            return false;
        }
    }, [deleteRoleApi, serverId, getRole]);

    const reorderRole = useCallback(async (roleId, { beforeRoleId, afterRoleId }) => {
        try {
            await reorderRoleApi({
                serverId,
                roleId,
                data: { beforeRoleId, afterRoleId },
            }).unwrap();
            return true;
        } catch (err) {
            console.error("Failed to reorder role:", err);
            return false;
        }
    }, [reorderRoleApi, serverId]);

    return {
        roles,
        getRole,
        createRole,
        updateRole,
        deleteRole,
        reorderRole,
        isLoading,
        isError,
        isCreating,
        isUpdating,
        isMockMode: false,
        STANDARD_COLORS,
    };
}

export function useRoles(serverId) {
    const mock = useRolesMock(serverId);
    const api = useRolesApi(serverId);
    return USE_MOCK_API ? mock : api;
}

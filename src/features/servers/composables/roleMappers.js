export const STANDARD_COLORS = [
    "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#e91e63", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#607d8b",
    "#11806a", "#1f8b4c", "#206694", "#71368a", "#ad1457", "#c27c0e", "#a84300", "#992d22", "#979c9f", "#546e7a",
];

const DEFAULT_ROLE_COLOR = "#99aab5";

export function mapRoleFromApi(role) {
    return {
        id: role.id,
        serverId: role.serverId,
        name: role.name,
        color: role.colorHex || DEFAULT_ROLE_COLOR,
        position: role.position,
        permissions: role.permissions ?? 0,
        isDefault: role.isDefault ?? false,
        isSeparate: role.hoist ?? false,
        isMentionable: role.mentionable ?? false,
        memberCount: 0,
    };
}

export function mapRoleToCreateBody(overrides = {}) {
    return {
        name: overrides.name ?? "new role",
        colorHex: overrides.color ?? DEFAULT_ROLE_COLOR,
        permissions: overrides.permissions ?? 0,
        hoist: overrides.isSeparate ?? false,
        mentionable: overrides.isMentionable ?? false,
    };
}

export function mapRoleToUpdateBody(draft, original) {
    const body = {};
    if (draft.name !== original.name) body.name = draft.name;
    if (draft.color !== original.color) body.colorHex = draft.color;
    if (draft.permissions !== original.permissions) body.permissions = draft.permissions;
    if (draft.isSeparate !== original.isSeparate) body.hoist = draft.isSeparate;
    if (draft.isMentionable !== original.isMentionable) body.mentionable = draft.isMentionable;
    return body;
}

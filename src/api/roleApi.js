import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseApi';

export const roleApi = createApi({
    reducerPath: 'roleApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Role'],
    endpoints: (builder) => ({
        getRoles: builder.query({
            query: (serverId) => `/v1/server/${serverId}/roles`,
            providesTags: ['Role'],
        }),
        createRole: builder.mutation({
            query: ({ serverId, data }) => ({
                url: `/v1/server/${serverId}/roles`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Role'],
        }),
        updateRole: builder.mutation({
            query: ({ serverId, roleId, data }) => ({
                url: `/v1/server/${serverId}/roles/${roleId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Role'],
        }),
        deleteRole: builder.mutation({
            query: ({ serverId, roleId }) => ({
                url: `/v1/server/${serverId}/roles/${roleId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Role'],
        }),
        reorderRole: builder.mutation({
            query: ({ serverId, roleId, data }) => ({
                url: `/v1/server/${serverId}/roles/${roleId}/reorder`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Role'],
        }),
        assignMemberRole: builder.mutation({
            query: ({ serverId, userId, roleId }) => ({
                url: `/v1/server/${serverId}/members/${userId}/roles/${roleId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Role'],
        }),
        removeMemberRole: builder.mutation({
            query: ({ serverId, userId, roleId }) => ({
                url: `/v1/server/${serverId}/members/${userId}/roles/${roleId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Role'],
        }),
    }),
});

export const {
    useGetRolesQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation,
    useReorderRoleMutation,
    useAssignMemberRoleMutation,
    useRemoveMemberRoleMutation,
} = roleApi;

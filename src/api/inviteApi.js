import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseApi';

export const inviteApi = createApi({
    reducerPath: 'inviteApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Invite'],
    endpoints: (builder) => ({
        // Lấy danh sách invite của một server
        getInvites: builder.query({
            query: (serverId) => `/v1/server/${serverId}/invites`,
            providesTags: ['Invite'],
        }),
        // Tạo invite mới cho server
        createInvite: builder.mutation({
            query: ({ serverId, data }) => ({
                url: `/v1/server/${serverId}/invites`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Invite'],
        }),
        // API theo hình ảnh BE cung cấp (v1/invite/{inviteId})
        getInvite: builder.query({
            query: (inviteId) => `/v1/invite/${inviteId}`,
            providesTags: ['Invite'],
        }),
        acceptInvite: builder.mutation({
            query: (inviteId) => ({
                url: `/v1/invite/${inviteId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Invite'],
        }),
        deleteInvite: builder.mutation({
            query: (inviteId) => ({
                url: `/v1/invite/${inviteId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Invite'],
        }),
    }),
});

export const {
    useGetInvitesQuery,
    useCreateInviteMutation,
    useGetInviteQuery,
    useAcceptInviteMutation,
    useDeleteInviteMutation
} = inviteApi;
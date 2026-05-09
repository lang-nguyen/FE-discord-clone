import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const inviteApi = createApi({
    reducerPath: 'inviteApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Invite'],
    endpoints: (builder) => ({
        getInvites: builder.query({
            query: (serverId) => `/servers/${serverId}/invites`,
            providesTags: ['Invite'],
        }),
        createInvite: builder.mutation({
            query: ({ serverId, data }) => ({
                url: `/servers/${serverId}/invites`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Invite'],
        }),
        deleteInvite: builder.mutation({
            query: ({ serverId, inviteCode }) => ({
                url: `/servers/${serverId}/invites/${inviteCode}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Invite'],
        }),
    }),
});

export const {
    useGetInvitesQuery,
    useCreateInviteMutation,
    useDeleteInviteMutation
} = inviteApi;
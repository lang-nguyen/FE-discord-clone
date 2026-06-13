import { baseApi } from "@/shared/api/baseApi";
import { normalizeChannel } from "@/shared/lib/normalizers";

export const channelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: (serverId) => ({ url: `/api/servers/${serverId}/channels` }),
      transformResponse: (response) =>
        (Array.isArray(response) ? response : []).map(normalizeChannel),
      providesTags: (result = [], _, serverId) => [
        { type: "Channel", id: `LIST-${serverId}` },
        ...result.map((channel) => ({ type: "Channel", id: channel.id })),
      ],
    }),
    createChannel: builder.mutation({
      query: ({ serverId, channel }) => ({
        url: `/api/servers/${serverId}/channels`,
        method: "POST",
        data: {
          name: channel.name,
          type: channel.type === "voice" ? 1 : 0,
          isPrivate: channel.isPrivate,
          afterChannelId: channel.afterChannelId || null,
          categoryId: channel.categoryId || null,
        },
      }),
      transformResponse: (response) =>
        normalizeChannel(typeof response === "object" ? response : { id: response }),
      invalidatesTags: (_, __, { serverId }) => [{ type: "Channel", id: `LIST-${serverId}` }],
    }),
    createCategory: builder.mutation({
      query: ({ serverId, category }) => ({
        url: `/api/servers/${serverId}/categories`,
        method: "POST",
        data: {
          name: category.name,
          isPrivate: Boolean(category.isPrivate),
        },
      }),
      invalidatesTags: (_, __, { serverId }) => [{ type: "Channel", id: `LIST-${serverId}` }],
    }),
  }),
});

export const { useCreateCategoryMutation, useCreateChannelMutation, useGetChannelsQuery } =
  channelsApi;

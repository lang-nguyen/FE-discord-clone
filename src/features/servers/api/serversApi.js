import { baseApi } from "@/shared/api/baseApi";
import { normalizeServer } from "@/shared/lib/normalizers";

function normalizeServerProfile(value) {
  const server = normalizeServer(value);
  return {
    ...server,
    serverName: server.name,
    avatarUrl: server.iconId || "",
    description: server.description,
    isPrivate: !server.isPublic,
    selectedBanner: server.bannerColor,
    establishedDate: server.createdAt,
    onlineCount: value?.onlineCount ?? value?.OnlineCount ?? 0,
    membersCount: value?.membersCount ?? value?.MembersCount ?? 0,
  };
}

export const serversApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServers: builder.query({
      query: () => ({ url: "/api/v1/server" }),
      transformResponse: (response) =>
        (Array.isArray(response) ? response : []).map(normalizeServer),
      providesTags: (result = []) => [
        { type: "Server", id: "LIST" },
        ...result.map((server) => ({ type: "Server", id: server.id })),
      ],
    }),
    getServer: builder.query({
      query: (serverId) => ({ url: `/api/v1/server/${serverId}` }),
      transformResponse: normalizeServerProfile,
      providesTags: (_, __, serverId) => [{ type: "Server", id: serverId }],
    }),
    createServer: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/server",
        method: "POST",
        data: payload,
      }),
      transformResponse: (response) =>
        normalizeServer(typeof response === "object" ? response : { id: response }),
      invalidatesTags: [{ type: "Server", id: "LIST" }],
    }),
    updateServer: builder.mutation({
      query: ({ serverId, profile }) => ({
        url: `/api/v1/server/${serverId}`,
        method: "PUT",
        data: {
          serverName: profile.serverName,
          serverDescription: profile.description,
          serverIconId: profile.iconId || null,
          serverBannerColor:
            profile.selectedBanner === undefined ? null : String(profile.selectedBanner),
        },
      }),
      invalidatesTags: (_, __, { serverId }) => [
        { type: "Server", id: serverId },
        { type: "Server", id: "LIST" },
      ],
    }),
    deleteServer: builder.mutation({
      query: (serverId) => ({
        url: `/api/v1/server/${serverId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, serverId) => [
        { type: "Server", id: serverId },
        { type: "Server", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateServerMutation,
  useDeleteServerMutation,
  useGetServerQuery,
  useGetServersQuery,
  useUpdateServerMutation,
} = serversApi;

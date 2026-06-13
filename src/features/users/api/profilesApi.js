import { baseApi } from "@/shared/api/baseApi";

export const profilesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({ url: "/api/profiles/me" }),
      providesTags: [{ type: "Profile", id: "ME" }],
    }),
    getProfileById: builder.query({
      query: (userId) => ({ url: `/api/profiles/${userId}` }),
      providesTags: (_, __, userId) => [{ type: "Profile", id: userId }],
    }),
    searchProfiles: builder.query({
      query: (query) => ({
        url: "/api/profiles/search",
        params: { q: query, limit: 20 },
      }),
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "/api/profiles/me",
        method: "PUT",
        data: payload,
      }),
      invalidatesTags: [{ type: "Profile", id: "ME" }],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetProfileByIdQuery,
  useLazySearchProfilesQuery,
  useUpdateProfileMutation,
} = profilesApi;

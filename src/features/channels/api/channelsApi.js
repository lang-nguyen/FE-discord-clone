import { baseApi } from "@/shared/api/baseApi";
import { normalizeCategory, normalizeChannel } from "@/shared/lib/normalizers";

const byPosition = (left, right) =>
  left.position - right.position || String(left.id).localeCompare(String(right.id));

function insertRelative(items, item, beforeId, afterId, placement = "end") {
  const remaining = items.filter((candidate) => candidate.id !== item.id);
  let index = placement === "start" ? 0 : remaining.length;
  if (beforeId) {
    const beforeIndex = remaining.findIndex((candidate) => candidate.id === beforeId);
    if (beforeIndex >= 0) index = beforeIndex + 1;
  } else if (afterId) {
    const afterIndex = remaining.findIndex((candidate) => candidate.id === afterId);
    if (afterIndex >= 0) index = afterIndex;
  }
  remaining.splice(index, 0, item);
  return remaining;
}

function applyChannelMove(
  draft,
  { channelId, targetCategoryId, beforeChannelId, afterChannelId, placement }
) {
  const channel = draft.find((candidate) => candidate.id === channelId);
  if (!channel) return;

  const sourceCategoryId = channel.categoryId || null;
  const targetId = targetCategoryId || null;
  const sourceItems = draft
    .filter(
      (candidate) => candidate.id !== channelId && (candidate.categoryId || null) === sourceCategoryId
    )
    .sort(byPosition);
  const targetItems = draft
    .filter(
      (candidate) => candidate.id !== channelId && (candidate.categoryId || null) === targetId
    )
    .sort(byPosition);

  channel.categoryId = targetId;
  const orderedTarget = insertRelative(
    targetItems,
    channel,
    beforeChannelId,
    afterChannelId,
    placement
  );
  orderedTarget.forEach((candidate, index) => {
    candidate.position = (index + 1) * 1000;
  });
  if (sourceCategoryId !== targetId) {
    sourceItems.forEach((candidate, index) => {
      candidate.position = (index + 1) * 1000;
    });
  }
}

function applyCategoryMove(draft, { categoryId, beforeCategoryId, afterCategoryId }) {
  const category = draft.find((candidate) => candidate.id === categoryId);
  if (!category) return;
  const ordered = insertRelative(
    [...draft].sort(byPosition),
    category,
    beforeCategoryId,
    afterCategoryId
  );
  ordered.forEach((candidate, index) => {
    candidate.position = index + 1;
  });
}

export const channelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: (serverId) => ({ url: `/api/servers/${serverId}/channels` }),
      transformResponse: (response) =>
        (Array.isArray(response) ? response : []).map(normalizeChannel).sort(byPosition),
      providesTags: (result = [], _, serverId) => [
        { type: "Channel", id: `LIST-${serverId}` },
        ...result.map((channel) => ({ type: "Channel", id: channel.id })),
      ],
    }),
    getCategories: builder.query({
      query: (serverId) => ({ url: `/api/servers/${serverId}/categories` }),
      transformResponse: (response) =>
        (Array.isArray(response) ? response : []).map(normalizeCategory).sort(byPosition),
      providesTags: (result = [], _, serverId) => [
        { type: "Category", id: `LIST-${serverId}` },
        ...result.map((category) => ({ type: "Category", id: category.id })),
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
      transformResponse: normalizeChannel,
      async onQueryStarted({ serverId, channel }, { dispatch, queryFulfilled }) {
        const temporaryId = `temporary-channel-${crypto.randomUUID?.() || Date.now()}`;
        const patch = dispatch(
          channelsApi.util.updateQueryData("getChannels", serverId, (draft) => {
            const position =
              Math.max(
                0,
                ...draft
                  .filter(
                    (candidate) =>
                      (candidate.categoryId || null) === (channel.categoryId || null)
                  )
                  .map((candidate) => candidate.position)
              ) + 1000;
            draft.push({
              id: temporaryId,
              name: channel.name,
              type: channel.type,
              isPrivate: Boolean(channel.isPrivate),
              categoryId: channel.categoryId || null,
              categoryName: null,
              position,
              optimistic: true,
            });
          })
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            channelsApi.util.updateQueryData("getChannels", serverId, (draft) => {
              const index = draft.findIndex((candidate) => candidate.id === temporaryId);
              if (index >= 0) draft[index] = data;
            })
          );
        } catch {
          patch.undo();
        }
      },
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
      transformResponse: normalizeCategory,
      async onQueryStarted({ serverId, category }, { dispatch, queryFulfilled }) {
        const temporaryId = `temporary-category-${crypto.randomUUID?.() || Date.now()}`;
        const patch = dispatch(
          channelsApi.util.updateQueryData("getCategories", serverId, (draft) => {
            draft.push({
              id: temporaryId,
              name: category.name,
              isPrivate: Boolean(category.isPrivate),
              position: Math.max(0, ...draft.map((candidate) => candidate.position)) + 1,
              optimistic: true,
            });
          })
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            channelsApi.util.updateQueryData("getCategories", serverId, (draft) => {
              const index = draft.findIndex((candidate) => candidate.id === temporaryId);
              if (index >= 0) draft[index] = data;
            })
          );
        } catch {
          patch.undo();
        }
      },
    }),
    moveChannel: builder.mutation({
      query: ({
        serverId,
        channelId,
        targetCategoryId,
        beforeChannelId,
        afterChannelId,
        placement,
      }) => ({
        url: `/api/servers/${serverId}/channels/${channelId}/move`,
        method: "PUT",
        data: {
          targetCategoryId: targetCategoryId || null,
          beforeChannelId: beforeChannelId || null,
          afterChannelId: afterChannelId || null,
          placement: placement || "end",
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          channelsApi.util.updateQueryData("getChannels", args.serverId, (draft) => {
            applyChannelMove(draft, args);
          })
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            channelsApi.util.updateQueryData("getChannels", args.serverId, (draft) => {
              data.channels?.forEach((position) => {
                const positionId = String(position.id).toLowerCase();
                const channel = draft.find((candidate) => candidate.id === positionId);
                if (channel) {
                  channel.categoryId = position.categoryId
                    ? String(position.categoryId).toLowerCase()
                    : null;
                  channel.position = position.position;
                }
              });
            })
          );
        } catch {
          patch.undo();
        }
      },
    }),
    reorderCategory: builder.mutation({
      query: ({ serverId, categoryId, beforeCategoryId, afterCategoryId }) => ({
        url: `/api/servers/${serverId}/categories/${categoryId}/reorder`,
        method: "PUT",
        data: {
          beforeCategoryId: beforeCategoryId || null,
          afterCategoryId: afterCategoryId || null,
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          channelsApi.util.updateQueryData("getCategories", args.serverId, (draft) => {
            applyCategoryMove(draft, args);
          })
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            channelsApi.util.updateQueryData("getCategories", args.serverId, (draft) => {
              data.categories?.forEach((position) => {
                const positionId = String(position.id).toLowerCase();
                const category = draft.find((candidate) => candidate.id === positionId);
                if (category) category.position = position.position;
              });
            })
          );
        } catch {
          patch.undo();
        }
      },
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useCreateChannelMutation,
  useGetCategoriesQuery,
  useGetChannelsQuery,
  useMoveChannelMutation,
  useReorderCategoryMutation,
} = channelsApi;

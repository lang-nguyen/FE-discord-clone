import { baseApi } from "@/shared/api/baseApi";
import { normalizeConversation, normalizeMessage } from "@/shared/lib/normalizers";

function normalizePage(response) {
  return {
    data: (response?.data || []).map(normalizeMessage).reverse(),
    nextCursor: response?.nextCursor || null,
    hasMore: Boolean(response?.hasMore),
  };
}

function optimisticMessage({ channelId, receiverId, content, sender, replyTo }) {
  return {
    id: `optimistic-${crypto.randomUUID?.() || Date.now()}`,
    channelId: channelId || null,
    receiverId: receiverId || null,
    content,
    sender,
    replyTo: replyTo || null,
    timestamp: new Date().toISOString(),
    updatedAt: null,
    isEdited: false,
    optimistic: true,
  };
}

export const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannelMessages: builder.query({
      query: ({ channelId, before, limit = 50 }) => ({
        url: `/api/messages/channels/${channelId}`,
        params: { before, limit },
      }),
      transformResponse: normalizePage,
      providesTags: (result, _, { channelId }) => [
        { type: "Message", id: `CHANNEL-${channelId}` },
        ...(result?.data || []).map((message) => ({ type: "Message", id: message.id })),
      ],
    }),
    getDirectMessages: builder.query({
      query: ({ recipientId, before, limit = 50 }) => ({
        url: `/api/messages/direct/${recipientId}`,
        params: { before, limit },
      }),
      transformResponse: normalizePage,
      providesTags: (result, _, { recipientId }) => [
        { type: "Message", id: `DM-${recipientId}` },
        ...(result?.data || []).map((message) => ({ type: "Message", id: message.id })),
      ],
    }),
    getConversations: builder.query({
      query: () => ({ url: "/api/messages/conversations" }),
      transformResponse: (response) => (response?.data || []).map(normalizeConversation),
      providesTags: [{ type: "Conversation", id: "LIST" }],
    }),
    sendMessage: builder.mutation({
      query: ({ channelId, receiverId, content, replyToMessageId }) => ({
        url: "/api/messages",
        method: "POST",
        data: { channelId, receiverId, content, replyToMessageId },
      }),
      transformResponse: normalizeMessage,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const endpoint = args.channelId ? "getChannelMessages" : "getDirectMessages";
        const queryArg = args.channelId
          ? { channelId: args.channelId }
          : { recipientId: args.receiverId };
        const draftMessage = optimisticMessage(args);
        const patch = dispatch(
          messagesApi.util.updateQueryData(endpoint, queryArg, (draft) => {
            draft?.data?.push(draftMessage);
          })
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            messagesApi.util.updateQueryData(endpoint, queryArg, (draft) => {
              const index = draft?.data?.findIndex((message) => message.id === draftMessage.id);
              if (index >= 0) draft.data[index] = data;
            })
          );
          dispatch(messagesApi.util.invalidateTags([{ type: "Conversation", id: "LIST" }]));
        } catch {
          patch.undo();
        }
      },
    }),
    replyMessage: builder.mutation({
      query: ({ messageId, content }) => ({
        url: `/api/messages/${messageId}/replies`,
        method: "POST",
        data: { content },
      }),
      transformResponse: normalizeMessage,
      invalidatesTags: (_, __, { channelId, recipientId }) => [
        {
          type: "Message",
          id: channelId ? `CHANNEL-${channelId}` : `DM-${recipientId}`,
        },
      ],
    }),
    editMessage: builder.mutation({
      query: ({ messageId, content }) => ({
        url: `/api/messages/${messageId}`,
        method: "PUT",
        data: { content },
      }),
      transformResponse: normalizeMessage,
      invalidatesTags: (_, __, { messageId }) => [{ type: "Message", id: messageId }],
    }),
    deleteMessage: builder.mutation({
      query: ({ messageId }) => ({
        url: `/api/messages/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { messageId }) => [
        { type: "Message", id: messageId },
        { type: "Conversation", id: "LIST" },
      ],
    }),
    getBlockedUsers: builder.query({
      query: () => ({ url: "/api/user-blocks" }),
      providesTags: [{ type: "UserBlock", id: "LIST" }],
    }),
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `/api/user-blocks/${userId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "UserBlock", id: "LIST" }],
    }),
    unblockUser: builder.mutation({
      query: (userId) => ({
        url: `/api/user-blocks/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "UserBlock", id: "LIST" }],
    }),
  }),
});

export const {
  useGetChannelMessagesQuery,
  useLazyGetChannelMessagesQuery,
  useGetDirectMessagesQuery,
  useLazyGetDirectMessagesQuery,
  useGetConversationsQuery,
  useSendMessageMutation,
  useReplyMessageMutation,
  useEditMessageMutation,
  useDeleteMessageMutation,
  useGetBlockedUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = messagesApi;

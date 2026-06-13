import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { messagesApi } from "@/features/messages/api/messagesApi";
import { normalizeMessage } from "@/shared/lib/normalizers";
import { useSocket } from "@/shared/hooks/useSocket";

function upsert(draft, message) {
  if (!draft?.data) return;
  const index = draft.data.findIndex((item) => item.id === message.id);
  if (index >= 0) draft.data[index] = message;
  else draft.data.push(message);
}

export function useRealtimeMessages({ channelId, recipientId, currentUserId }) {
  const dispatch = useDispatch();
  const { connection, isConnected } = useSocket();

  useEffect(() => {
    if (!connection || !isConnected) return undefined;

    const query = channelId ? { channelId } : { recipientId };
    const endpoint = channelId ? "getChannelMessages" : "getDirectMessages";

    const handleMessage = (value) => {
      const message = normalizeMessage(value);
      if (channelId && message.channelId !== channelId) return;
      if (recipientId) {
        const otherUserId =
          message.sender.id === currentUserId ? message.receiverId : message.sender.id;
        if (otherUserId !== recipientId) return;
      }
      dispatch(
        messagesApi.util.updateQueryData(endpoint, query, (draft) => upsert(draft, message))
      );
      dispatch(messagesApi.util.invalidateTags([{ type: "Conversation", id: "LIST" }]));
    };

    const handleDelete = (value) => {
      const messageId = typeof value === "string" ? value : value?.messageId;
      dispatch(
        messagesApi.util.updateQueryData(endpoint, query, (draft) => {
          if (draft?.data) draft.data = draft.data.filter((message) => message.id !== messageId);
        })
      );
    };

    const receiveEvent = channelId ? "ReceiveChannelMessage" : "ReceiveDirectMessage";
    connection.on(receiveEvent, handleMessage);
    connection.on("MessageUpdated", handleMessage);
    connection.on("MessageDeleted", handleDelete);
    if (channelId) connection.invoke("JoinChannel", channelId).catch(() => undefined);

    return () => {
      connection.off(receiveEvent, handleMessage);
      connection.off("MessageUpdated", handleMessage);
      connection.off("MessageDeleted", handleDelete);
      if (channelId) connection.invoke("LeaveChannel", channelId).catch(() => undefined);
    };
  }, [channelId, connection, currentUserId, dispatch, isConnected, recipientId]);
}

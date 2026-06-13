import { useEffect, useMemo, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChannelHeader } from "@/features/messages/components/ChannelHeader";
import { FriendsEmptyState } from "@/features/messages/components/FriendsEmptyState";
import { MessageComposer } from "@/features/messages/components/MessageComposer";
import { MessageList } from "@/features/messages/components/MessageList";
import {
  useBlockUserMutation,
  useDeleteMessageMutation,
  useEditMessageMutation,
  useGetBlockedUsersQuery,
  useGetChannelMessagesQuery,
  useGetDirectMessagesQuery,
  useLazyGetChannelMessagesQuery,
  useLazyGetDirectMessagesQuery,
  useReplyMessageMutation,
  useSendMessageMutation,
  useUnblockUserMutation,
} from "@/features/messages/api/messagesApi";
import { useGetProfileByIdQuery } from "@/features/users/api/profilesApi";
import { getErrorMessage } from "@/shared/api/error";
import { useToast } from "@/shared/ui/ToastProvider";
import { useRealtimeMessages } from "@/features/messages/hooks/useRealtimeMessages";
import { Button } from "@/shared/components/ui/Button";

export function HomePage() {
  const { channelId, recipientId } = useParams();
  const { channels = [] } = useOutletContext() || {};
  const { user, profile } = useSelector((state) => state.auth);
  const { showToast } = useToast();
  const [olderMessages, setOlderMessages] = useState([]);
  const [replyTarget, setReplyTarget] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);

  const activeChannel = useMemo(
    () => channels.find((channel) => channel.id === channelId),
    [channelId, channels]
  );
  const { data: recipientProfile } = useGetProfileByIdQuery(recipientId, {
    skip: !recipientId,
  });
  const recipient = recipientId
    ? {
        id: recipientProfile?.id || recipientId,
        displayName: recipientProfile?.displayName || "Direct Message",
        avatarUrl: recipientProfile?.avatarUrl || null,
      }
    : null;

  const channelQuery = useGetChannelMessagesQuery(
    { channelId },
    { skip: !channelId || Boolean(recipientId) }
  );
  const directQuery = useGetDirectMessagesQuery(
    { recipientId },
    { skip: !recipientId }
  );
  const query = recipientId ? directQuery : channelQuery;
  const [loadOlderChannel, olderChannelState] = useLazyGetChannelMessagesQuery();
  const [loadOlderDirect, olderDirectState] = useLazyGetDirectMessagesQuery();
  const [sendMessage, sendState] = useSendMessageMutation();
  const [replyMessage, replyState] = useReplyMessageMutation();
  const [editMessage, editState] = useEditMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const { data: blockedUsers = [] } = useGetBlockedUsersQuery();
  const [blockUser, blockState] = useBlockUserMutation();
  const [unblockUser, unblockState] = useUnblockUserMutation();

  const displayName = profile?.displayName || user?.username || "Discord User";
  const currentUserId = user?.id;
  const isBlocked = Boolean(recipientId && blockedUsers.includes(recipientId));
  const messages = useMemo(() => {
    const unique = new Map();
    [...olderMessages, ...(query.data?.data || [])].forEach((message) =>
      unique.set(message.id, message)
    );
    return [...unique.values()].sort(
      (left, right) => new Date(left.timestamp) - new Date(right.timestamp)
    );
  }, [olderMessages, query.data?.data]);

  useRealtimeMessages({ channelId, recipientId, currentUserId });

  useEffect(() => {
    setOlderMessages([]);
    setReplyTarget(null);
    setEditingMessage(null);
  }, [channelId, recipientId]);

  if (!activeChannel && !recipientId) {
    return <FriendsEmptyState displayName={displayName} />;
  }

  const runMutation = async (operation, title) => {
    try {
      return await operation();
    } catch (error) {
      showToast({
        title,
        description: getErrorMessage(error),
        variant: "error",
      });
      throw error;
    }
  };

  const handleSend = async (content) => {
    if (editingMessage) {
      await runMutation(
        () => editMessage({ messageId: editingMessage.id, content }).unwrap(),
        "Message not updated"
      );
      return;
    }

    if (replyTarget) {
      await runMutation(
        () =>
          replyMessage({
            messageId: replyTarget.id,
            content,
            channelId,
            recipientId,
          }).unwrap(),
        "Reply not sent"
      );
      return;
    }

    await runMutation(
      () =>
        sendMessage({
          channelId,
          receiverId: recipientId,
          content,
          sender: {
            id: currentUserId || "me",
            username: displayName,
            avatar: profile?.avatarUrl || null,
          },
        }).unwrap(),
      "Message not sent"
    );
  };

  const handleLoadOlder = async () => {
    const before = query.data?.nextCursor;
    if (!before) return;
    const page = recipientId
      ? await loadOlderDirect({ recipientId, before }).unwrap()
      : await loadOlderChannel({ channelId, before }).unwrap();
    setOlderMessages((current) => [...page.data, ...current]);
  };

  const targetName = recipient
    ? recipient.displayName
    : activeChannel
      ? `#${activeChannel.name}`
      : "conversation";

  return (
    <section className="flex h-full flex-col overflow-hidden bg-chat-bg text-primary-text">
      <div className="relative">
        <ChannelHeader channel={activeChannel} recipient={recipient} />
        {recipient && (
          <Button
            type="button"
            size="sm"
            variant={isBlocked ? "secondary" : "danger"}
            isLoading={blockState.isLoading || unblockState.isLoading}
            onClick={() =>
              runMutation(
                () =>
                  (isBlocked ? unblockUser(recipientId) : blockUser(recipientId)).unwrap(),
                isBlocked ? "Unable to unblock user" : "Unable to block user"
              )
            }
            className="absolute right-3 top-1.5"
          >
            {isBlocked ? "Unblock" : "Block"}
          </Button>
        )}
      </div>
      <MessageList
        targetName={targetName}
        channel={activeChannel}
        recipient={recipient}
        messages={messages}
        isLoading={query.isLoading}
        error={query.error}
        hasMore={query.data?.hasMore}
        isLoadingOlder={olderChannelState.isFetching || olderDirectState.isFetching}
        onLoadOlder={handleLoadOlder}
        currentUserId={currentUserId}
        onReply={(message) => {
          setEditingMessage(null);
          setReplyTarget(message);
        }}
        onEdit={(message) => {
          setReplyTarget(null);
          setEditingMessage(message);
        }}
        onDelete={(message) =>
          runMutation(
            () => deleteMessage({ messageId: message.id }).unwrap(),
            "Message not deleted"
          )
        }
      />
      <MessageComposer
        targetName={targetName}
        onSend={handleSend}
        isSending={sendState.isLoading || replyState.isLoading || editState.isLoading}
        disabled={isBlocked}
        replyTarget={replyTarget}
        editingMessage={editingMessage}
        onCancelMode={() => {
          setReplyTarget(null);
          setEditingMessage(null);
        }}
      />
    </section>
  );
}

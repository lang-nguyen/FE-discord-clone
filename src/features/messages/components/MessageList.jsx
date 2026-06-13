import { useEffect, useRef } from "react";
import { Hash, Volume2 } from "lucide-react";
import { MessageItem } from "@/features/messages/components/MessageItem";

export function MessageList({
  targetName,
  channel,
  recipient,
  messages,
  isLoading,
  error,
  hasMore,
  isLoadingOlder,
  onLoadOlder,
  currentUserId,
  onReply,
  onEdit,
  onDelete,
}) {
  const endRef = useRef(null);
  const targetId = recipient?.id || channel?.id || "empty";
  const displayName = recipient?.displayName || channel?.name || targetName || "conversation";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [targetId, messages]);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
      <div className="mb-6">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-hover-bg">
          {recipient ? (
            <img
              src={
                recipient.avatarUrl ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(recipient.displayName)}`
              }
              alt=""
              className="h-16 w-16 rounded-full"
            />
          ) : channel?.type === "voice" ? (
            <Volume2 className="h-10 w-10 text-primary-text" />
          ) : (
            <Hash className="h-10 w-10 text-primary-text" />
          )}
        </div>
        <h2 className="text-3xl font-bold">
          {recipient ? displayName : `Welcome to #${displayName}!`}
        </h2>
        <p className="mt-1 text-sm text-muted-text">
          {recipient
            ? `This is the beginning of your direct message history with ${displayName}.`
            : `This is the start of the #${displayName} channel.`}
        </p>
      </div>

      <div className="my-4 h-px bg-hover-bg/40" />
      {hasMore && (
        <button
          type="button"
          onClick={onLoadOlder}
          disabled={isLoadingOlder}
          className="mx-auto block rounded bg-hover-bg px-3 py-1.5 text-xs text-primary-text disabled:opacity-50"
        >
          {isLoadingOlder ? "Loading..." : "Load older messages"}
        </button>
      )}
      {isLoading && <p className="text-sm text-muted-text">Loading messages...</p>}
      {error && (
        <p className="text-sm text-red-300">
          Message history is unavailable. New messages can still arrive through realtime.
        </p>
      )}
      {!isLoading &&
        messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            isOwn={message.sender.id === currentUserId}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      <div ref={endRef} />
    </div>
  );
}

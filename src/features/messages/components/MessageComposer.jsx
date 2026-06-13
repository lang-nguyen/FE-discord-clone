import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function MessageComposer({
  targetName,
  channel,
  onSend,
  isSending,
  disabled,
  replyTarget,
  editingMessage,
  onCancelMode,
}) {
  const [content, setContent] = useState("");
  const resolvedTargetName = targetName || (channel ? `#${channel.name}` : "");

  useEffect(() => {
    setContent(editingMessage?.content || "");
  }, [editingMessage]);

  const handleSubmit = async () => {
    if (!content.trim() || isSending || disabled) return;
    const nextContent = content.trim();
    setContent("");
    try {
      await onSend(nextContent);
      onCancelMode?.();
    } catch {
      setContent(nextContent);
    }
  };

  return (
    <div className="bg-chat-bg p-4 pt-0">
      {(replyTarget || editingMessage) && (
        <div className="flex items-center justify-between rounded-t-lg bg-server-sidebar-bg px-3 py-2 text-xs text-muted-text">
          <span>
            {editingMessage
              ? "Editing message"
              : `Replying to ${replyTarget.sender.username}`}
          </span>
          <button type="button" onClick={onCancelMode} aria-label="Cancel">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <label className="sr-only" htmlFor="message-composer">
        Message {resolvedTargetName}
      </label>
      <textarea
        id="message-composer"
        value={content}
        disabled={isSending || disabled}
        maxLength={2000}
        rows={1}
        onChange={(event) => setContent(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
          }
        }}
        placeholder={
          disabled ? "You cannot send messages to this user" : `Message ${resolvedTargetName}`
        }
        className={`min-h-12 w-full resize-none bg-input-bg px-4 py-3 text-sm font-medium text-primary-text placeholder:text-muted-text focus:outline-none disabled:opacity-60 ${
          replyTarget || editingMessage ? "rounded-b-lg" : "rounded-lg"
        }`}
      />
      <div className="mt-1 text-right text-[10px] text-muted-text">{content.length}/2000</div>
    </div>
  );
}

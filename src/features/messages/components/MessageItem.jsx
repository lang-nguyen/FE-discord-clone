import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/shared/components/ui/ContextMenu";

export function MessageItem({ message, isOwn, onReply, onEdit, onDelete }) {
  const avatar =
    message.sender.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(message.sender.username)}`;

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <article className="-mx-4 flex items-start gap-4 rounded px-4 py-1 transition-colors hover:bg-hover-bg/30">
          <img src={avatar} alt="" className="mt-0.5 h-10 w-10 shrink-0 rounded-full bg-zinc-600" />
          <div className="min-w-0 flex-1">
            {message.replyTo && (
              <button
                type="button"
                onClick={() => onReply?.(message.replyTo)}
                className="mb-1 block max-w-full truncate text-xs text-muted-text hover:underline"
              >
                Replying to {message.replyTo.sender.username}: {message.replyTo.content}
              </button>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-primary-text">{message.sender.username}</span>
              <time className="text-[10px] text-muted-text" dateTime={message.timestamp}>
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
              {message.isEdited && <span className="text-[10px] text-muted-text">(edited)</span>}
              {message.optimistic && <span className="text-[10px] text-muted-text">sending...</span>}
            </div>
            <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-primary-text">
              {message.content}
            </p>
          </div>
        </article>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => onReply?.(message)}>Reply</ContextMenuItem>
        {isOwn && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem onSelect={() => onEdit?.(message)}>Edit message</ContextMenuItem>
            <ContextMenuItem className="text-red-300" onSelect={() => onDelete?.(message)}>
              Delete message
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}

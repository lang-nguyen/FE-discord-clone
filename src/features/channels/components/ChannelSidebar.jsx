import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/shared/components/ui/ContextMenu";
import ServerHeader from "@/features/servers/components/ServerHeader";
import { ChannelCategory } from "@/features/channels/components/ChannelCategory";
import { ChannelItem } from "@/features/channels/components/ChannelItem";
import { MessageCirclePlus } from "lucide-react";

function groupChannels(channels) {
  return channels.reduce((groups, channel) => {
    const key =
      channel.categoryName || (channel.type === "voice" ? "VOICE CHANNELS" : "TEXT CHANNELS");
    const current = groups[key] || [];
    groups[key] = [...current, channel];
    return groups;
  }, {});
}

export function ChannelSidebar({
  server,
  channels,
  activeChannelId,
  onCreateChannel,
  onCreateCategory,
  footer,
  conversations = [],
  activeRecipientId,
  onNewDirectMessage,
}) {
  const navigate = useNavigate();
  const [hideMuted, setHideMuted] = useState(false);
  const groups = useMemo(() => groupChannels(channels), [channels]);

  if (!server) {
    return (
      <aside className="relative flex w-[240px] shrink-0 flex-col border-r border-black/10 bg-nav-sidebar-bg">
        <div className="flex-1 px-3 py-4">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-text">
            <span className="flex items-center justify-between">
              Direct Messages
              <button
                type="button"
                onClick={onNewDirectMessage}
                className="rounded p-1 hover:bg-hover-bg hover:text-primary-text"
                aria-label="New direct message"
              >
                <MessageCirclePlus className="h-4 w-4" />
              </button>
            </span>
          </p>
          <button
            type="button"
            onClick={() => navigate("/channels/@me")}
            className="mb-2 w-full rounded-md bg-hover-bg px-2 py-2 text-left text-sm font-medium text-primary-text"
          >
            Friends
          </button>
          <div className="space-y-1">
            {conversations.map((conversation) => {
              const recipient = conversation.recipient;
              const active = recipient.id === activeRecipientId;
              return (
                <button
                  key={recipient.id}
                  type="button"
                  onClick={() => navigate(`/channels/@me/${recipient.id}`)}
                  className={`flex w-full items-center gap-3 rounded px-2 py-2 text-left ${
                    active ? "bg-hover-bg text-primary-text" : "text-muted-text hover:bg-hover-bg/60"
                  }`}
                >
                  <img
                    src={
                      recipient.avatarUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        recipient.displayName
                      )}`
                    }
                    alt=""
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {recipient.displayName}
                  </span>
                  {conversation.unreadCount > 0 && (
                    <span className="rounded-full bg-red-500 px-1.5 text-xs text-white">
                      {conversation.unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {footer}
      </aside>
    );
  }

  return (
    <aside className="relative flex w-[240px] shrink-0 flex-col border-r border-black/10 bg-nav-sidebar-bg">
      <ServerHeader
        serverName={server.name}
        onClickHeader={() => navigate(`/settings/server/${server.id}/server-profile`)}
      />
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="flex-1 overflow-y-auto pt-4 scrollbar-hide">
            {Object.entries(groups).map(([categoryName, items]) => (
              <ChannelCategory
                key={categoryName}
                title={categoryName}
                onAdd={() => onCreateChannel(items[0]?.categoryId || null)}
              >
                {items.map((channel) => (
                  <ChannelItem
                    key={channel.id}
                    type={channel.type}
                    name={channel.name}
                    isActive={channel.id === activeChannelId}
                    isPrivate={channel.isPrivate}
                    onChannelClick={() => navigate(`/channels/${server.id}/${channel.id}`)}
                  />
                ))}
              </ChannelCategory>
            ))}
            {!channels.length && (
              <p className="px-4 py-8 text-center text-xs text-muted-text">
                Right-click here to add a channel.
              </p>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-52">
          <ContextMenuItem onSelect={() => setHideMuted((value) => !value)}>
            <span className="flex-1">Hide Muted Channels</span>
            <span aria-hidden="true">{hideMuted ? "✓" : ""}</span>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={() => onCreateChannel(null)}>Create Channel</ContextMenuItem>
          <ContextMenuItem onSelect={onCreateCategory}>Create Category</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {footer}
    </aside>
  );
}

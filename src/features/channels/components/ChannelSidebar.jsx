import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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

const UNCATEGORIZED_ID = "uncategorized";
const categoryDndId = (id) => `category:${id}`;
const channelDndId = (id) => `channel:${id}`;
const byPosition = (left, right) =>
  left.position - right.position || String(left.id).localeCompare(String(right.id));

function DropLine({ edge }) {
  if (!edge) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-x-2 z-30 h-0.5 rounded-full bg-[#5865f2] shadow-[0_0_0_1px_rgba(88,101,242,0.2)] ${
        edge === "before" ? "-top-px" : "-bottom-px"
      }`}
      aria-hidden="true"
    />
  );
}

function SortableChannel({ channel, activeChannelId, serverId, dropEdge }) {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: channelDndId(channel.id),
    data: {
      kind: "channel",
      channelId: channel.id,
      categoryId: channel.categoryId || null,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="relative"
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <DropLine edge={dropEdge} />
      <ChannelItem
        type={channel.type}
        name={channel.name}
        isActive={channel.id === activeChannelId?.toLowerCase()}
        isPrivate={channel.isPrivate}
        isDragging={isDragging}
        isDropTarget={false}
        dragProps={{ ...attributes, ...listeners }}
        onChannelClick={() => navigate(`/channels/${serverId}/${channel.id}`)}
      />
    </div>
  );
}

function ChannelGroup({
  category,
  channels,
  activeChannelId,
  serverId,
  onAdd,
  isOver,
  dropEdge,
  showChannelAppendLine,
  channelDrop,
  sortable = true,
}) {
  const dndId = categoryDndId(category.id);
  const sortableState = useSortable({
    id: dndId,
    data: { kind: "category", categoryId: category.id },
    disabled: !sortable,
  });
  const droppableState = useDroppable({
    id: dndId,
    data: { kind: "category", categoryId: category.id },
    disabled: sortable,
  });
  const state = sortable ? sortableState : droppableState;
  const style = sortable
    ? {
        transform: CSS.Transform.toString(sortableState.transform),
        transition: sortableState.transition,
      }
    : undefined;

  return (
    <div ref={state.setNodeRef} className="relative" style={style}>
      <DropLine edge={dropEdge} />
      <ChannelCategory
        title={category.name}
        onAdd={onAdd}
        dragProps={
          sortable ? { ...sortableState.attributes, ...sortableState.listeners } : undefined
        }
        isDragging={sortable && sortableState.isDragging}
        isDropTarget={isOver}
      >
        <SortableContext
          items={channels.map((channel) => channelDndId(channel.id))}
          strategy={verticalListSortingStrategy}
        >
          {channels.map((channel) => (
            <SortableChannel
              key={channel.id}
              channel={channel}
              activeChannelId={activeChannelId}
              serverId={serverId}
              dropEdge={
                channelDrop?.channelId === channel.id ? channelDrop.edge : null
              }
            />
          ))}
        </SortableContext>
        {showChannelAppendLine && (
          <div
            className="mx-2 mb-1 h-0.5 rounded-full bg-[#5865f2] shadow-[0_0_0_1px_rgba(88,101,242,0.2)]"
            aria-hidden="true"
          />
        )}
      </ChannelCategory>
    </div>
  );
}

function TopLevelChannels({
  channels,
  activeChannelId,
  serverId,
  isOver,
  isDragging,
  channelDrop,
}) {
  const { setNodeRef } = useDroppable({
    id: categoryDndId(UNCATEGORIZED_ID),
    data: { kind: "category", categoryId: UNCATEGORIZED_ID },
  });

  return (
    <div className={`relative ${isOver ? "border-t-2 border-[#5865f2] pt-1" : ""}`}>
      <div
        ref={setNodeRef}
        className={`absolute inset-x-0 -top-3 z-10 h-6 ${isDragging ? "block" : "hidden"}`}
        aria-hidden="true"
      />
      <SortableContext
        items={channels.map((channel) => channelDndId(channel.id))}
        strategy={verticalListSortingStrategy}
      >
        {channels.map((channel) => (
          <SortableChannel
            key={channel.id}
            channel={channel}
            activeChannelId={activeChannelId}
            serverId={serverId}
            dropEdge={
              channelDrop?.channelId === channel.id ? channelDrop.edge : null
            }
          />
        ))}
      </SortableContext>
    </div>
  );
}

export function ChannelSidebar({
  server,
  channels,
  categories = [],
  activeChannelId,
  onCreateChannel,
  onCreateCategory,
  onMoveChannel,
  onReorderCategory,
  footer,
  conversations = [],
  activeRecipientId,
  onNewDirectMessage,
}) {
  const navigate = useNavigate();
  const [hideMuted, setHideMuted] = useState(false);
  const [activeDrag, setActiveDrag] = useState(null);
  const [overId, setOverId] = useState(null);
  const [dropIndicator, setDropIndicator] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const orderedCategories = useMemo(() => [...categories].sort(byPosition), [categories]);
  const channelsByCategory = useMemo(() => {
    const groups = new Map([[UNCATEGORIZED_ID, []]]);
    orderedCategories.forEach((category) => groups.set(category.id, []));
    [...channels].sort(byPosition).forEach((channel) => {
      const key = channel.categoryId || UNCATEGORIZED_ID;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(channel);
    });
    return groups;
  }, [channels, orderedCategories]);

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

  const handleDragEnd = (event) => {
    const activeData = event.active.data.current;
    const overData = event.over?.data.current;
    setActiveDrag(null);
    setOverId(null);
    setDropIndicator(null);
    if (!activeData || !overData || event.active.id === event.over?.id) return;

    if (activeData.kind === "category") {
      const targetCategoryId =
        overData.kind === "category" ? overData.categoryId : overData.categoryId;
      if (!targetCategoryId || targetCategoryId === UNCATEGORIZED_ID) return;
      const currentIndex = orderedCategories.findIndex(
        (category) => category.id === activeData.categoryId
      );
      const overIndex = orderedCategories.findIndex(
        (category) => category.id === targetCategoryId
      );
      if (currentIndex < 0 || overIndex < 0) return;
      const reordered = [...orderedCategories];
      const [moved] = reordered.splice(currentIndex, 1);
      const targetIndex = reordered.findIndex(
        (category) => category.id === targetCategoryId
      );
      const insertionIndex =
        targetIndex + (dropIndicator?.edge === "after" ? 1 : 0);
      reordered.splice(insertionIndex, 0, moved);
      const index = reordered.findIndex((category) => category.id === moved.id);
      onReorderCategory({
        categoryId: moved.id,
        beforeCategoryId: index > 0 ? reordered[index - 1].id : null,
        afterCategoryId: index < reordered.length - 1 ? reordered[index + 1].id : null,
      });
      return;
    }

    if (activeData.kind !== "channel") return;
    const targetCategoryId =
      overData.kind === "channel"
        ? overData.categoryId || null
        : overData.categoryId === UNCATEGORIZED_ID
          ? null
          : overData.categoryId;
    let beforeChannelId = null;
    let afterChannelId = null;
    let placement = "end";
    if (overData.kind === "channel") {
      placement = null;
      if (dropIndicator?.edge === "after") {
        beforeChannelId = overData.channelId;
      } else {
        afterChannelId = overData.channelId;
      }
    } else if (overData.categoryId === UNCATEGORIZED_ID) {
      placement = "start";
    }
    onMoveChannel({
      channelId: activeData.channelId,
      targetCategoryId,
      beforeChannelId,
      afterChannelId,
      placement,
    });
  };

  const activeChannel =
    activeDrag?.kind === "channel"
      ? channels.find((channel) => channel.id === activeDrag.channelId)
      : null;
  const activeCategory =
    activeDrag?.kind === "category"
      ? categories.find((category) => category.id === activeDrag.categoryId)
      : null;

  return (
    <aside className="relative flex w-[240px] shrink-0 flex-col border-r border-black/10 bg-nav-sidebar-bg">
      <ServerHeader
        serverName={server.name}
        onClickHeader={() => navigate(`/settings/server/${server.id}/server-profile`)}
      />
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="flex-1 overflow-y-auto pt-4 scrollbar-hide">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={({ active }) => setActiveDrag(active.data.current)}
              onDragOver={(event) => {
                const over = event.over;
                setOverId(over?.id || null);
                if (!over) {
                  setDropIndicator(null);
                  return;
                }

                const translated = event.active.rect.current.translated;
                const activeCenter = translated
                  ? translated.top + translated.height / 2
                  : over.rect.top;
                const overCenter = over.rect.top + over.rect.height / 2;
                setDropIndicator({
                  id: over.id,
                  edge: activeCenter > overCenter ? "after" : "before",
                  kind: over.data.current?.kind,
                });
              }}
              onDragCancel={() => {
                setActiveDrag(null);
                setOverId(null);
                setDropIndicator(null);
              }}
              onDragEnd={handleDragEnd}
            >
              <TopLevelChannels
                channels={channelsByCategory.get(UNCATEGORIZED_ID) || []}
                activeChannelId={activeChannelId}
                serverId={server.id}
                isOver={overId === categoryDndId(UNCATEGORIZED_ID)}
                isDragging={activeDrag?.kind === "channel"}
                channelDrop={
                  dropIndicator?.kind === "channel"
                    ? {
                        channelId: String(dropIndicator.id).replace("channel:", ""),
                        edge: dropIndicator.edge,
                      }
                    : null
                }
              />
              <SortableContext
                items={orderedCategories.map((category) => categoryDndId(category.id))}
                strategy={verticalListSortingStrategy}
              >
                {orderedCategories.map((category) => (
                  <ChannelGroup
                    key={category.id}
                    category={category}
                    channels={channelsByCategory.get(category.id) || []}
                    activeChannelId={activeChannelId}
                    serverId={server.id}
                    onAdd={() => onCreateChannel(category.id)}
                    isOver={overId === categoryDndId(category.id)}
                    dropEdge={
                      activeDrag?.kind === "category" &&
                      overId === categoryDndId(category.id)
                        ? dropIndicator?.edge
                        : null
                    }
                    showChannelAppendLine={
                      activeDrag?.kind === "channel" &&
                      overId === categoryDndId(category.id)
                    }
                    channelDrop={
                      dropIndicator?.kind === "channel"
                        ? {
                            channelId: String(dropIndicator.id).replace("channel:", ""),
                            edge: dropIndicator.edge,
                          }
                        : null
                    }
                  />
                ))}
              </SortableContext>
              {createPortal(
                <DragOverlay>
                  {activeChannel ? (
                    <div className="w-[220px] rounded bg-hover-bg shadow-xl">
                      <ChannelItem type={activeChannel.type} name={activeChannel.name} />
                    </div>
                  ) : activeCategory ? (
                    <div className="w-[220px] rounded bg-hover-bg px-3 py-2 text-xs font-bold uppercase text-primary-text shadow-xl">
                      {activeCategory.name}
                    </div>
                  ) : null}
                </DragOverlay>,
                document.body
              )}
            </DndContext>
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

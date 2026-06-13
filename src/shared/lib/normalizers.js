function read(value, camelKey, pascalKey = camelKey[0].toUpperCase() + camelKey.slice(1)) {
  return value?.[camelKey] ?? value?.[pascalKey];
}

/** @returns {import("@/shared/models/domain").Server} */
export function normalizeServer(value = {}) {
  return {
    id: read(value, "id"),
    name: read(value, "name") || "",
    description: read(value, "description") || "",
    bannerColor: read(value, "bannerColor") || "#5865F2",
    iconId: read(value, "iconId") || null,
    ownerId: read(value, "ownerId") || null,
    isPublic: read(value, "isPublic") ?? true,
    createdAt: read(value, "createdAt") || null,
  };
}

/** @returns {import("@/shared/models/domain").Channel} */
export function normalizeChannel(value = {}) {
  const rawType = read(value, "type");

  return {
    id: read(value, "id"),
    name: read(value, "name") || "",
    type: rawType === 1 || rawType === "voice" ? "voice" : "text",
    position: read(value, "position") || 0,
    categoryId: read(value, "categoryId") || null,
    categoryName: read(value, "categoryName") || null,
    isPrivate: Boolean(read(value, "isPrivate")),
  };
}

/** @returns {import("@/shared/models/domain").Message} */
export function normalizeMessage(value = {}) {
  const sender = read(value, "sender") || {};
  const replyTo = read(value, "replyTo");

  return {
    id: read(value, "id"),
    channelId: read(value, "channelId") || null,
    receiverId: read(value, "receiverId") || null,
    content: read(value, "content") || "",
    timestamp: read(value, "timestamp") || read(value, "createdAt") || new Date().toISOString(),
    updatedAt: read(value, "updatedAt") || null,
    isEdited: Boolean(read(value, "isEdited")),
    optimistic: Boolean(read(value, "optimistic")),
    sender: {
      id: read(sender, "id"),
      username: read(sender, "username") || read(sender, "displayName") || "Unknown user",
      avatar: read(sender, "avatar") || read(sender, "avatarUrl") || null,
    },
    replyTo: replyTo ? normalizeReply(replyTo) : null,
  };
}

function normalizeReply(value) {
  const sender = read(value, "sender") || {};
  return {
    id: read(value, "id"),
    content: read(value, "content") || "",
    sender: {
      id: read(sender, "id"),
      username: read(sender, "username") || read(sender, "displayName") || "Unknown user",
      avatar: read(sender, "avatar") || read(sender, "avatarUrl") || null,
    },
  };
}

export function normalizeConversation(value = {}) {
  const recipient = read(value, "recipient") || {};
  return {
    recipient: {
      id: read(recipient, "id"),
      displayName: read(recipient, "displayName") || "Unknown user",
      avatarUrl: read(recipient, "avatarUrl") || null,
    },
    lastMessage: normalizeMessage(read(value, "lastMessage") || {}),
    updatedAt: read(value, "updatedAt") || null,
    unreadCount: read(value, "unreadCount") || 0,
  };
}

/**
 * @typedef {object} Server
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} bannerColor
 * @property {string|null} iconId
 * @property {string|null} ownerId
 * @property {boolean} isPublic
 * @property {string|null} createdAt
 */

/**
 * @typedef {"text"|"voice"} ChannelType
 */

/**
 * @typedef {object} Channel
 * @property {string} id
 * @property {string} name
 * @property {ChannelType} type
 * @property {number} position
 * @property {string|null} categoryId
 * @property {string|null} categoryName
 * @property {boolean} isPrivate
 */

/**
 * @typedef {object} Message
 * @property {string} id
 * @property {string} channelId
 * @property {string} content
 * @property {string} timestamp
 * @property {{id: string, username: string, avatar: string|null}} sender
 */

export {};

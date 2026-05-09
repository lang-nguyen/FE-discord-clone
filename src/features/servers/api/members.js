/**
 * Member API Layer
 * Maps to GuildService MemberController: /api/v1/server/{serverId}/members
 *
 * Endpoints:
 *  DELETE  /{memberId}/kick          - Kick a member (body: { reason? })
 *  POST    /{memberId}/ban           - Ban a member   (body: { reason? })
 *  POST    /{memberId}/unban         - Unban a member
 *  POST    /{memberId}/block         - Block a member
 *  POST    /{memberId}/unblock       - Unblock a member
 *  POST    /transfer-ownership       - Transfer ownership (body: { newOwnerId })
 *  POST    /join                     - Current user joins server
 *  POST    /leave                    - Current user leaves server
 */

import httpClient from "../../../lib/httpClient";

const memberPath = (serverId) => `/api/v1/server/${serverId}/members`;

/**
 * Kick a member from the server.
 * @param {string} serverId
 * @param {string} memberId
 * @param {string|null} reason
 */
export async function kickMember(serverId, memberId, reason = null) {
  return httpClient.delete(`${memberPath(serverId)}/${memberId}/kick`, {
    data: { reason },
  });
}

/**
 * Ban a member from the server.
 * @param {string} serverId
 * @param {string} memberId
 * @param {string|null} reason
 */
export async function banMember(serverId, memberId, reason = null) {
  return httpClient.post(`${memberPath(serverId)}/${memberId}/ban`, { reason });
}

/**
 * Unban a member from the server.
 * @param {string} serverId
 * @param {string} memberId
 */
export async function unbanMember(serverId, memberId) {
  return httpClient.post(`${memberPath(serverId)}/${memberId}/unban`);
}

/**
 * Block a member within the server.
 * @param {string} serverId
 * @param {string} memberId
 */
export async function blockMember(serverId, memberId) {
  return httpClient.post(`${memberPath(serverId)}/${memberId}/block`);
}

/**
 * Unblock a previously blocked member.
 * @param {string} serverId
 * @param {string} memberId
 */
export async function unblockMember(serverId, memberId) {
  return httpClient.post(`${memberPath(serverId)}/${memberId}/unblock`);
}

/**
 * Transfer server ownership to another member.
 * @param {string} serverId
 * @param {string} newOwnerId - The memberId receiving ownership
 */
export async function transferOwnership(serverId, newOwnerId) {
  return httpClient.post(`${memberPath(serverId)}/transfer-ownership`, {
    newOwnerId,
  });
}

/**
 * Current authenticated user joins the server.
 * @param {string} serverId
 */
export async function joinServer(serverId) {
  return httpClient.post(`${memberPath(serverId)}/join`);
}

/**
 * Current authenticated user leaves the server.
 * @param {string} serverId
 */
export async function leaveServer(serverId) {
  return httpClient.post(`${memberPath(serverId)}/leave`);
}

/**
 * Change the server nickname of a member.
 * Passing null clears the nickname.
 * @param {string} serverId
 * @param {string} memberId
 * @param {string|null} nickname
 */
export async function changeNickname(serverId, memberId, nickname = null) {
  return httpClient.patch(`${memberPath(serverId)}/${memberId}/nickname`, { nickname });
}

/**
 * Prune inactive members from the server.
 * @param {string} serverId
 * @param {number} days    - Members inactive more than this many days will be removed
 * @param {string|null} roleId - If provided, only prune members with this role (or no roles)
 * @returns {{ pruned: number }}
 */
export async function pruneMembers(serverId, days, roleId = null) {
  return httpClient.post(`${memberPath(serverId)}/prune`, { days, roleId });
}

/**
 * Fetch the ban list for a server.
 * @param {string} serverId
 * @returns {Array<{ userId, bannedBy, reason }>}
 */
export async function getBans(serverId) {
  return httpClient.get(`${memberPath(serverId)}/bans`);
}

/**
 * Fetch the member list for a server.
 * @param {string} serverId
 * @param {number} pageIndex
 * @param {number} pageSize
 * @returns {Promise<any>}
 */
export async function getMembers(serverId, pageIndex = 1, pageSize = 50) {
  return httpClient.get(`${memberPath(serverId)}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
}

import axiosClient from "../../../api/axiosClient";

export const inviteService = {
    // 1. Phục vụ lấy danh sách hiển thị ban đầu
    getInvites: async (serverId) => {
        // Ví dụ API của .NET thiết kế là GET: /api/servers/{serverId}/invites
        return await axiosClient.get(`/api/servers/${serverId}/invites`);
    },

    // 2. Phục vụ nút "Create invite link"
    createInvite: async (serverId, data) => {
        return await axiosClient.post(`/api/servers/${serverId}/invites`, data);
    },

    // 3. Phục vụ nút "Delete (icon thùng rác)"
    deleteInvite: async (serverId, inviteCode) => {
        return await axiosClient.delete(`/api/servers/${serverId}/invites/${inviteCode}`);
    }
};
import apiClient from "@/shared/api/client";

export const serverApi = {
    /**
     * Get server profile by server name or ID
     */
    getProfile: async (serverName) => {
        const response = await apiClient.get(`/api/v1/server/${serverName}`);
        const data = response.data;
        // Map backend schema to frontend format
        return {
            ...data,
            serverName: data.name,
            description: data.description || "",
            isPrivate: !data.isPublic,
            establishedDate: data.createdAt,
            // map iconId to avatarUrl if necessary, though it might need full URL resolution depending on backend
            avatarUrl: data.iconId || "",
        };
    },

    updateProfile: async (serverName, profileData) => {
        // Map frontend schema back to backend format
        const payload = {
            serverName: profileData.serverName,
            serverDescription: profileData.description,
            serverIconId: profileData.avatarUrl !== "" ? profileData.iconId : null,
            // Thêm field này để truyền sang BE:
            serverBannerColor: profileData.selectedBanner !== undefined ? profileData.selectedBanner.toString() : null,
        };
        const response = await apiClient.put(`/api/v1/server/${serverName}`, payload);
        return response.data;
    },

    /**
     * Get server by ID/Name (Placeholder based on comments)
     */
    getServer: async (serverName) => {
        // const response = await apiClient.get(`/api/guilds/${serverName}`);
        // return response.data;
        throw new Error("Not implemented yet");
    },

    /**
     * Delete server by ID/Name (Placeholder based on comments)
     */
    deleteServer: async (serverName) => {
        const response = await apiClient.delete(`/api/v1/server/${serverName}`);
        return response.data;
    }
};

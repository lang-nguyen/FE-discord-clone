import apiClient from "@/shared/api/client";

const mockUserServers = {
  joined: [
    {
      id: "grad",
      name: "Cong ty tot nghiep",
      subtitle: "Tet le di nhau di",
      color: "#2f8f6f",
    },
    {
      id: "commerce",
      name: "E-Commerce",
      subtitle: "Noah",
      color: "#6b63ff",
    },
  ],
  owned: [
    {
      id: "discord",
      name: "Discord-Clone",
      subtitle: "Hoc le sap tot nghiep roi",
      color: "#5865F2",
    },
  ],
};

export const profileApi = {
  async getMe() {
    const response = await apiClient.get("/api/profiles/me");
    return response.data;
  },

  async updateMe(payload) {
    const response = await apiClient.put("/api/profiles/me", payload);
    return response.data;
  },

  async getUserServers() {
    return mockUserServers;
  },
};

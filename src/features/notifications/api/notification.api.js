import apiClient from "@/shared/api/client";

export const notificationApi = {
  async getMine() {
    const response = await apiClient.get("/api/notifications");
    return response.data;
  },

  async create(payload) {
    const response = await apiClient.post("/api/notifications", payload);
    return response.data;
  },

  async markAsRead(id) {
    await apiClient.patch(`/api/notifications/${id}/read`);
  },

  async sendEmail(payload) {
    const response = await apiClient.post("/api/notifications/email", payload);
    return response.data;
  },
};

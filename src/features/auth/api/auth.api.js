import apiClient from "@/shared/api/client";

export const authApi = {
  async register(payload) {
    const response = await apiClient.post("/api/accounts/register", payload);
    return response.data;
  },

  async login(payload) {
    const response = await apiClient.post("/api/accounts/login", payload);
    return response.data;
  },

  async refresh(refreshToken) {
    const response = await apiClient.post("/api/accounts/refresh", { refreshToken });
    return response.data;
  },

  async logout(refreshToken) {
    const response = await apiClient.post("/api/accounts/logout", { refreshToken });
    return response.data;
  },

  async changePassword(payload) {
    const response = await apiClient.post("/api/accounts/change-password", payload);
    return response.data;
  },

  async me() {
    const response = await apiClient.get("/api/accounts/me");
    return response.data;
  },

  async forgotPassword(email) {
    const response = await apiClient.post("/api/accounts/forgot-password", { email });
    return response.data;
  },
};

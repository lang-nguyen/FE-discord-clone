import axios from "axios";
import {
  clearAuthSession,
  getStoredAccessToken,
  getStoredRefreshToken,
  persistAuthSession,
} from "@/features/auth/utils/authStorage";

const apiGatewayUrl = import.meta.env.VITE_API_GATEWAY_URL;

if (!apiGatewayUrl) {
  throw new Error("VITE_API_GATEWAY_URL is not configured");
}

const apiClient = axios.create({
  baseURL: apiGatewayUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredAccessToken();
    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (
      status !== 401 ||
      originalRequest?._retry ||
      originalRequest?.url?.includes("/api/accounts/refresh")
    ) {
      return Promise.reject(error);
    }

    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) {
      clearAuthSession();
      return Promise.reject(error);
    }

    try {
      originalRequest._retry = true;
      const refreshResponse = await axios.post(
        `${apiClient.defaults.baseURL}/api/accounts/refresh`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const tokenData = refreshResponse.data;
      persistAuthSession({
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken,
      });

      originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      clearAuthSession();
      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
      return Promise.reject(refreshError);
    }
  }
);

export default apiClient;

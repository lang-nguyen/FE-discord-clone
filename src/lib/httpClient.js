/**
 * Axios HTTP client instance shared across all API modules.
 * Base URL is read from VITE_API_BASE_URL (set in .env).
 * JWT token is automatically injected from localStorage.
 */

import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5218",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ---- Request interceptor: attach Bearer token ----
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---- Response interceptor: unwrap data / handle errors ----
httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.title ||
      error.message ||
      "Unknown error";

    // Re-throw a unified error object so composables can catch it
    return Promise.reject({ status: error.response?.status, message });
  }
);

export default httpClient;

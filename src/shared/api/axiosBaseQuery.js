import apiClient from "@/shared/api/client";
import { toApiError } from "@/shared/api/error";

export function axiosBaseQuery() {
  return async ({ url, method = "GET", data, params, headers }) => {
    try {
      const response = await apiClient({
        url,
        method,
        data,
        params,
        headers,
      });

      return { data: response.data };
    } catch (error) {
      return { error: toApiError(error) };
    }
  };
}

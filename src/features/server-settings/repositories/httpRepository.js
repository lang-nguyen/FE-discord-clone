import apiClient from "@/shared/api/client";

export function createHttpRepository(resourceUrl) {
  return {
    async list() {
      const response = await apiClient.get(resourceUrl);
      return response.data;
    },
    async create(payload) {
      const response = await apiClient.post(resourceUrl, payload);
      return response.data;
    },
    async update(id, payload) {
      const response = await apiClient.put(`${resourceUrl}/${id}`, payload);
      return response.data;
    },
    async remove(id) {
      await apiClient.delete(`${resourceUrl}/${id}`);
      return { id };
    },
  };
}

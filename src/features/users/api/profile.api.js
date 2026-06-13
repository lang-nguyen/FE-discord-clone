import apiClient from "@/shared/api/client";

export const profileApi = {
  async initAvatarUpload(file) {
    const idempotencyKey = crypto.randomUUID?.() ?? `${Date.now()}-${file.name}`;
    const response = await apiClient.post(
      "/api/media/init-upload",
      {
        contentType: file.type,
        fileName: file.name,
        sizeBytes: file.size,
        ownerType: "USER",
      },
      {
        headers: {
          "Idempotency-Key": idempotencyKey,
        },
      }
    );

    return response.data;
  },

  async uploadAvatarToCloudinary(uploadUrl, file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || "Unable to upload avatar to Cloudinary.");
    }

    return response.json();
  },

  async completeAvatarUpload(mediaId) {
    await apiClient.put(`/api/media/${mediaId}/complete-upload`);
  },

  async uploadAvatar(file) {
    const initUpload = await this.initAvatarUpload(file);
    await this.uploadAvatarToCloudinary(initUpload.uploadUrl, file);
    await this.completeAvatarUpload(initUpload.mediaId);
    return { id: initUpload.mediaId };
  },
};

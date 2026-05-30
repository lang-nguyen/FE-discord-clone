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

  async initAvatarUpload(file) {
    const idempotencyKey = crypto.randomUUID?.() ?? `${Date.now()}-${file.name}`;
    const response = await apiClient.post("/api/media/init-upload", {
      contentType: file.type,
      fileName: file.name,
      sizeBytes: file.size,
      ownerType: "USER",
    }, {
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    });

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

  async getUserServers() {
    return mockUserServers;
  },
};

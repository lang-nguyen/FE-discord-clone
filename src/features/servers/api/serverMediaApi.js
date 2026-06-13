import apiClient from "@/shared/api/client";

export async function uploadServerIcon(file) {
  const idempotencyKey = crypto.randomUUID?.() ?? `${Date.now()}-${file.name}`;
  const initResponse = await apiClient.post(
    "/api/media/init-upload",
    {
      contentType: file.type,
      fileName: file.name,
      sizeBytes: file.size,
      ownerType: "SERVER",
    },
    {
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    }
  );

  const { mediaId, uploadUrl } = initResponse.data;
  const formData = new FormData();
  formData.append("file", file);

  const uploadResponse = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });
  if (!uploadResponse.ok) {
    throw new Error((await uploadResponse.text()) || "Unable to upload the server icon.");
  }

  await apiClient.put(`/api/media/${mediaId}/complete-upload`);
  return mediaId;
}

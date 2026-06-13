function getValidationMessage(data) {
  if (!data?.errors || typeof data.errors !== "object") return null;

  for (const messages of Object.values(data.errors)) {
    if (Array.isArray(messages) && messages.length > 0) return messages[0];
    if (typeof messages === "string" && messages) return messages;
  }

  return null;
}

export function getErrorMessage(error, fallback = "Something went wrong.") {
  const data = error?.data || error?.response?.data;

  return (
    data?.message ||
    data?.Message ||
    getValidationMessage(data) ||
    data?.title ||
    error?.message ||
    fallback
  );
}

export function toApiError(error) {
  return {
    status: error?.response?.status || "CLIENT_ERROR",
    data: error?.response?.data || {
      message: getErrorMessage(error),
    },
  };
}

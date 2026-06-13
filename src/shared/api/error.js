export function getErrorMessage(error, fallback = "Something went wrong.") {
  return (
    error?.data?.message ||
    error?.data?.Message ||
    error?.response?.data?.message ||
    error?.response?.data?.Message ||
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

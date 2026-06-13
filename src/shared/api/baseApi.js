import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Server", "Channel", "Category", "Message", "Conversation", "Profile", "UserBlock"],
  endpoints: () => ({}),
});

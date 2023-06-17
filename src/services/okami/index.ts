import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAllWorksUnreadQuerySchema, type Work } from "./types";
import { OKAMI_API_URL } from "@env";

const okamiServer = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: OKAMI_API_URL,
  }),
  tagTypes: ["Work"],
  endpoints: (builder) => ({
    fetchAllWorksUnread: builder.query<Work[], void>({
      query: () => ({ url: "/work/fetch-for-workers-unread" }),
      providesTags: ["Work"],
      transformResponse: (data) => fetchAllWorksUnreadQuerySchema.parse(data),
    }),

    markWorkRead: builder.mutation<void, { id: string; chapter: number }>({
      query: ({ id, chapter }) => ({
        url: `/work/${id}/update-chapater`,
        body: {
          chapter,
        },
        method: "Patch",
      }),
      invalidatesTags: ["Work"],
    }),
  }),
});

export const { useFetchAllWorksUnreadQuery, useMarkWorkReadMutation } =
  okamiServer;

export default okamiServer;

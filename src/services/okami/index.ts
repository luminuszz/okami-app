import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  fetchAllWorksUnreadQuerySchema,
  type UpdateWorkInput,
  type Work,
  workSchema,
} from "./types";
import { OKAMI_API_URL } from "@env";
import { map } from "lodash";

const okamiServer = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: OKAMI_API_URL,
  }),
  tagTypes: ["Work"],
  endpoints: (builder) => ({
    fetchAllWorksUnread: builder.query<Work[], void>({
      query: () => ({ url: "/work/fetch-for-workers-unread" }),
      providesTags: (results) => {
        return map(results, (work) => ({ type: "Work", id: work.id }));
      },
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

    getOneWork: builder.query<Work, string>({
      query: (id) => ({ url: `/work/find/${id}`, method: "GET" }),
      providesTags: (result) => [{ type: "Work", id: result?.id }],
      transformResponse: (data) => {
        return workSchema.parse(data);
      },
    }),

    updateWork: builder.mutation<void, UpdateWorkInput>({
      query: ({ id, data }) => ({
        url: "/work/update-work",
        method: "PUT",
        body: {
          id,
          data,
        },
      }),

      invalidatesTags: (_, __, params) => [
        {
          type: "Work",
          id: params.id,
        },
      ],
    }),

    refreshWorks: builder.query<void, void>({
      query: () => ({ url: "/work/refresh-chapters", method: "GET" }),
    }),
  }),
});

export const {
  useFetchAllWorksUnreadQuery,
  useMarkWorkReadMutation,
  useGetOneWorkQuery,
  useUpdateWorkMutation,
  useLazyRefreshWorksQuery,
} = okamiServer;

export default okamiServer;

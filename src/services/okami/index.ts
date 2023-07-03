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
  tagTypes: ["Work", "WorkRead", "WorkUnread"],
  endpoints: (builder) => ({
    fetchAllWorksUnread: builder.query<Work[], void>({
      query: () => ({ url: "/work/fetch-for-workers-unread" }),
      providesTags: (results) => {
        return map(results, (work) => ({ type: "WorkUnread", id: work.id }));
      },
      transformResponse: (data) => fetchAllWorksUnreadQuerySchema.parse(data),
    }),

    fetchAllWorksRead: builder.query<Work[], void>({
      query: () => ({ url: "/work/fetch-for-workers-read" }),
      providesTags: (results) => {
        return map(results, (work) => ({ type: "WorkRead", id: work.id }));
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
      invalidatesTags: (_, __, params) => [
        { type: "WorkUnread", id: params.id },
      ],
    }),

    markWorkFinished: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/work/mark-finished/${id}`,
        method: "Patch",
      }),
      invalidatesTags: ["WorkRead"],
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
  useFetchAllWorksReadQuery,
  useMarkWorkFinishedMutation,
  endpoints,
} = okamiServer;

export default okamiServer;

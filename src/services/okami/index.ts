import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  fetchAllWorksUnreadQuerySchema,
  type UpdateWorkInput,
  type User,
  UserSchema,
  type Work,
  workSchema,
} from "./types";
import { OKAMI_API_URL } from "@env";
import { map } from "lodash";
import { setToken } from "../../features/auth/auth.slice";
import { type RootState } from "../../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const okamiServer = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: OKAMI_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Work", "WorkRead", "WorkUnread", "User"],

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

    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),

      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const results = await queryFulfilled;

        const { token } = results.data;

        await AsyncStorage.setItem("@okami:token", token);

        dispatch(setToken(token));
      },
    }),

    getCurrentUser: builder.query<User, void>({
      query: () => ({ url: "/auth/user/me" }),
      providesTags: ["User"],
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
  useLoginMutation,
  useGetCurrentUserQuery,
} = okamiServer;

export default okamiServer;

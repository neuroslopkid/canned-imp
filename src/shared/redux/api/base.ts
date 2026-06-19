import { ApiUrl } from "@api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: ApiUrl,
  }),

  tagTypes: ["test"],

  endpoints: () => ({}),
});

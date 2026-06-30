import { baseApi } from "./base";

export const addedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchFAQs: builder.query<any, any>({
      query: ({ q, limit }) => ({
        url: "/added",
        params: {
          q,
          limit,
        },
      }),

      providesTags: ["added"],
    }),
  }),
});

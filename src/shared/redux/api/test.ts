import { baseApi } from "./base";

export const testApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchFAQs: builder.query<any, any>({
      query: ({ q, limit }) => ({
        url: "/test",
        params: {
          q,
          limit,
        },
      }),

      providesTags: ["test"],
    }),
  }),
});

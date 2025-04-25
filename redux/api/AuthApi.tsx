import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    adminLogin: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    logout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
    
      }),
      invalidatesTags: ["auth"],
    }),
  }),

  overrideExisting: false,
});

export const { useAdminLoginMutation, useLogoutMutation } = authApi;

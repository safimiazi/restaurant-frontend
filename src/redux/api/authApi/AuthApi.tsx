/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    userLogin: builder.mutation({
      query: (userInfo : any) => ({
        url: '/user/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    adminLogin: builder.mutation({
      query: (userInfo : any) => ({
        url: '/user/admin-login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    customerRegistration: builder.mutation({
      query: (userInfo : any) => ({
        url: '/user/registration',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useUserLoginMutation, useCustomerRegistrationMutation, useAdminLoginMutation } = authApi;
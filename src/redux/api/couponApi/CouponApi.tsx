import { baseApi } from "../baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    couponPost: build.mutation({
      query: (data) => {
        return {
          url: "/coupon/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["coupon"],
    }),
    couponUpdate: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/coupon/update/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["coupon"],
    }),

    couponDelete: build.mutation({
      query: (id ) => ({
        url: `/coupon/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["coupon"],
    }),

    getcouponData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/coupon/get-all",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
      providesTags: ["coupon"], // ক্যাশিং ��িকমতো কা�� করবে
    }),
  }),

  overrideExisting: false,
});

export const {
  useCouponPostMutation,
  useCouponUpdateMutation,
  useCouponDeleteMutation,
  useGetcouponDataQuery,
} = couponApi;

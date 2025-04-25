import { baseApi } from "./baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    brandPost: build.mutation({
      query: (data) => ({
        url: "/brand/post_brand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brand"], 
    }),
    brandPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/brand/update_brand/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["brand"], // আপডেট হলে ক্যাশ রিফ্রেশ হবে
    }),
    brandDelete: build.mutation({
      query: ({ id }) => ({
        url: `/brand/delete_brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"], // আপডেট হলে ক্যাশ রিফ্রেশ হবে
    }),

    getAllBrand: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/brand/get_all_brand",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
      providesTags: ["brand"], // ক্যাশিং এনাবল করবে
    }),
  }),

  overrideExisting: false,
});

export const {
  useBrandDeleteMutation,
  useBrandPostMutation,
  useBrandPutMutation,
  useGetAllBrandQuery,
} = brandApi;
import { baseApi } from "../baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    brandPost: build.mutation({
      query: (data) => ({
        url: "/brand/post_brand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brand"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে
    }),
    brandPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/brand/put_brand/${id}`,
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
    bulkDelete: build.mutation({
      query: (ids) => ({
        url: `/brand/delete_bulk`,
        method: "POST",
        body: { ids },
      }),
      invalidatesTags: ["brand"], // আপডেট হলে ক্যাশ রিফ্রেশ হবে
    }),
    getbrandData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/brand/get_brands",
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
  useGetbrandDataQuery,
  useBulkDeleteMutation,
} = brandApi;

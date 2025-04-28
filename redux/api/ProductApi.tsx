import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    productPost: build.mutation({
      query: (data) => ({
        url: "/product/post_product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"], 
    }),
    productPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/product/update_product/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product"], // আপডেট হলে ক্যাশ রিফ্রেশ হবে
    }),
    productGetSingle: build.query({
      query: ({  id }) => ({
        url: `/product/get_single_product/${id}`,
        method: "GET",
      }),
      providesTags: ["product"], // ক্যাশিং এনাবল করবে
    }),
    productDelete: build.mutation({
      query: ({ id }) => ({
        url: `/product/delete_product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"], // আপডেট হলে ক্যাশ রিফ্রেশ হবে
    }),

    productGetAll: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/product/get_all_product",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
      providesTags: ["product"], // ক্যাশিং এনাবল করবে
    }),
  }),

  overrideExisting: false,
});

export const {
    useProductDeleteMutation,
    useProductGetAllQuery,
    useProductGetSingleQuery,
    useProductPutMutation,
    useProductPostMutation

} = productApi;
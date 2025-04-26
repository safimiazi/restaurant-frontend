import { baseApi } from "./baseApi";

const productAttributeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    productAttributePost: build.mutation({
      query: (data) => ({
        url: "/atribute/post_attribute",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["productAttribute"], 
    }),
    productAttributePut: build.mutation({
      query: ({ data, id }) => ({
        url: `/atribute/update_attribute/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["productAttribute"], // আপডেট হলে ক্যাশ রিফ্রেশ হবে
    }),
    productAttributeGetSingle: build.query({
      query: ({  id }) => ({
        url: `/atribute/get_single_attribute/${id}`,
        method: "GET",
      }),
      providesTags: ["productAttribute"], // ক্যাশিং এনাবল করবে
    }),
    productAttributeDelete: build.mutation({
      query: ({ id }) => ({
        url: `/atribute/delete_attribute/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["productAttribute"], // আপডেট হলে ক্যাশ রিফ্রেশ হবে
    }),

    productAttributeGetAll: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/atribute/get_all_attribute",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
      providesTags: ["productAttribute"], // ক্যাশিং এনাবল করবে
    }),
  }),

  overrideExisting: false,
});

export const {
    useProductAttributeDeleteMutation,
    useProductAttributePostMutation,
    useProductAttributePutMutation,
    useProductAttributeGetAllQuery,
    useProductAttributeGetSingleQuery,
} = productAttributeApi;
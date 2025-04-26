import { baseApi } from "./baseApi";

const productAttributeOptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    productAttributeOptionPost: build.mutation({
      query: (data) => ({
        url: "/atribute_option/post_attribute_option",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["productAttributeOption"], 
    }),
    productAttributeOptionPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/atribute_option/update_attribute_option/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["productAttributeOption"], // আপডেট হলে ক্যাশ রিফ্রেশ হবে
    }),
    productAttributeOptionGetSingle: build.query({
      query: ({  id }) => ({
        url: `/atribute_option/get_single_attribute_option/${id}`,
        method: "GET",
      }),
      providesTags: ["productAttributeOption"], // ক্যাশিং এনাবল করবে
    }),
    productAttributeOptionDelete: build.mutation({
      query: ({ id }) => ({
        url: `/atribute_option/delete_attribute_option/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["productAttributeOption"], // আপডেট হলে ক্যাশ রিফ্রেশ হবে
    }),

    productAttributeOptionGetAll: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/atribute_option/get_all_attribute_option",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
      providesTags: ["productAttributeOption"], // ক্যাশিং এনাবল করবে
    }),
  }),

  overrideExisting: false,
});

export const {
    useProductAttributeOptionDeleteMutation,
    useProductAttributeOptionPostMutation,
    useProductAttributeOptionPutMutation,
    useProductAttributeOptionGetAllQuery,
    useProductAttributeOptionGetSingleQuery,
} = productAttributeOptionApi;
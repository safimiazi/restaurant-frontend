import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    categoryPost: build.mutation({
      query: (data) => ({
        url: "/category/post_category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    categoryPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/category/update_category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["category"], // আপডেট হলে ক্যাশ রিফ্রেশ হবে
    }),
    categoryDelete: build.mutation({
      query: ({ id }) => ({
        url: `/category/delete_category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"], // আপডেট হলে ক্যাশ রিফ্রেশ হবে
    }),

    getAllCategory: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/category/get_all_category",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
      providesTags: ["category"], // ক্যাশিং এনাবল করবে
    }),
  }),

  overrideExisting: false,
});

export const {
  useCategoryPostMutation,
  useCategoryPutMutation,
  useCategoryDeleteMutation,
  useGetAllCategoryQuery,
} = categoryApi;

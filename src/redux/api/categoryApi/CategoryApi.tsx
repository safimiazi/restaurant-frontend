import { baseApi } from "../baseApi";

const CategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Category Create
    categoryPost: build.mutation({
      query: (data) => ({
        url: "/category/post_category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"], // ক্যাশ রিফ্রেশ করবে
    }),

    // Category Update
    categoryPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/category/put_category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    // Category Delete
    categoryDelete: build.mutation({
      query: ({ id }) => ({
        url: `/category/delete_category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // Bulk Delete
    categoryBulkDelete: build.mutation({
      query: ({ ids }) => ({
        url: `/category/category_bulk_delete`,
        method: "DELETE",
        body: { ids },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(CategoryApi.util.invalidateTags(["Category"])); // ক্যাশ ফোর্স রিফ্রেশ
        } catch (error) {
          console.error("Bulk Delete Failed:", error);
        }
      },
    }),

    // Get Categories (Provides Tags for Caching)
    getCategoryData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/category/get_category",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
      providesTags: ["Category"], // ক্যাশিং ঠিকমতো কাজ করবে
    }),
    getCategoryForSidebar: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/category/get_category_for_sidebar",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
      providesTags: ["Category"], // ক্যাশিং ঠিকমতো কাজ করবে
    }),
  }),

  overrideExisting: false,
});

export const {
  useCategoryDeleteMutation,
  useCategoryPostMutation,
  useCategoryPutMutation,
  useGetCategoryDataQuery,
  useCategoryBulkDeleteMutation,
  useGetCategoryForSidebarQuery
} = CategoryApi;

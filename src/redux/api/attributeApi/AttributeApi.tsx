import { baseApi } from "../baseApi";

const AttributeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    attributePost: build.mutation({
      query: (data) => ({
        url: "/attribute/post_attribute",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["attribute"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে
    }),
    attributePut: build.mutation({
      query: ({ data, id }) => ({
        url: `/attribute/put_attribute/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["attribute"], // আপডেট হলে ক্যাশ রিফ্রেশ হবে
    }),
    attributeDelete: build.mutation({
      query: ({ id }) => ({
        url: `/attribute/delete_attribute/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["attribute"], // ডিলিট হলে ক্যাশ রিফ্রেশ হবে
    }),
    getattributeData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/attribute/get_attribute",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
      providesTags: ["attribute"], // ক্যাশিং এনাবল করবে
    }),
  }),

  overrideExisting: false,
});

export const {
useAttributeDeleteMutation,
useAttributePostMutation,
useAttributePutMutation,
useGetattributeDataQuery
} = AttributeApi;

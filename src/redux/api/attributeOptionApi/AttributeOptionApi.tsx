import { baseApi } from "../baseApi";

const AttributeOptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    attributeOptionPost: build.mutation({
      query: (data) => ({
        url: "/attributeOption/post_attributeOption",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["attributeOption"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে
    }),
    attributeOptionPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/attributeOption/put_attributeOption/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["attributeOption"], // আপডেট হলে ক্যাশ রিফ্রেশ হবে
    }),
    attributeOptionDelete: build.mutation({
      query: ({ id }) => ({
        url: `/attributeOption/delete_attributeOption/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["attributeOption"], // ডিলিট হলে ক্যাশ রিফ্রেশ হবে
    }),
    getattributeOptionData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/attributeOption/get_attributeOption",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
      providesTags: ["attributeOption"], // ক্যাশিং এনাবল করবে
    }),
  }),

  overrideExisting: false,
});

export const {
  useAttributeOptionDeleteMutation,
  useAttributeOptionPostMutation,
  useAttributeOptionPutMutation,
  useGetattributeOptionDataQuery,
} = AttributeOptionApi;

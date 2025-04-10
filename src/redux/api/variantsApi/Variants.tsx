import { baseApi } from "../baseApi";

const variantsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createVariant: build.mutation({
      invalidatesTags: ["variants"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে

      query: (data) => {
        return {
          url: "/variants/create",
          method: "POST",
          body: data,
        };
      },
    }),
    updateVariant: build.mutation({
      invalidatesTags: ["variants"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে

      query: ({ data, id }) => ({
        url: `/variants/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    softDeleteVariant: build.mutation({
      invalidatesTags: ["variants"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে

      query: ({ id }) => ({
        url: `/variants/${id}`,
        method: "DELETE",
      }),
    }),
    bulkSoftDeleteVariant: build.mutation({
      query: (ids) => {
        return {
          url: "/variants/bulk-delete",
          method: "DELETE",
          body: { ids }, // Ensure this is an array of valid ObjectIds
        };
      },
      invalidatesTags: ["variants"],
    }),

    getAllVariant: build.query({
      providesTags: ["variants"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে

      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/variants",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useSoftDeleteVariantMutation,
  useBulkSoftDeleteVariantMutation,
  useGetAllVariantQuery,
} = variantsApi;

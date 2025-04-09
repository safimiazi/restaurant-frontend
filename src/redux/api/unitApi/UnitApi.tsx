import { baseApi } from "../baseApi";

const unitApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    create: build.mutation({
      invalidatesTags: ["unit"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে

      query: (data) => {
        return {
          url: "/unit/create",
          method: "POST",
          body: data,
        };
      },
    }),
    update: build.mutation({
      invalidatesTags: ["unit"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে

      query: ({ data, id }) => ({
        url: `/unit/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    softDelete: build.mutation({
      invalidatesTags: ["unit"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে

      query: ({ id }) => ({
        url: `/unit/${id}`,
        method: "DELETE",
      }),
    }),
    bulkSoftDelete: build.mutation({
      query: (ids) => {
        return {
          url: "/unit/bulk-delete",
          method: "DELETE",
          body: { ids }, // Ensure this is an array of valid ObjectIds
        };
      },
      invalidatesTags: ["unit"],
    }),

    getAll: build.query({
      providesTags: ["unit"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে

      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/unit",
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
  useCreateMutation,
  useUpdateMutation,
  useSoftDeleteMutation,
  useBulkSoftDeleteMutation,
  useGetAllQuery,
} = unitApi;

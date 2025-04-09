import { baseApi } from "../baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    cartPost: build.mutation({
      query: (data) => {
        return {
          url: "/cart/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["cart"],
    }),
    cartRemove: build.mutation({
      query: (data) => {
        return {
          url: "/cart/remove_from_cart",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["cart"],
    }),
    cartUpdate: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/cart/update/${id}`,
          method: "PUT",
          body: data,
        };
      },
    }),

    cartDelete: build.mutation({
      query: ({ id }) => ({
        url: `/cart/product_cart_delete`,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["cart"],
    }),
    bulkDelete: build.mutation({
      query: ({ ids }) => ({
        url: `/cart/bulk`,
        method: "POST",
        body: { ids },
      }),
    }),
    getcartData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/cart",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
    }),
    adminGetAllCart: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/cart/admin_get_all_cart",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
    }),

    getSinglecartData: build.query({
      query: () => ({
        url: `/cart/user_cart`,
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useCartDeleteMutation,
  useCartPostMutation,
  useCartUpdateMutation,
  useGetSinglecartDataQuery,
  useGetcartDataQuery,
  useBulkDeleteMutation,
  useCartRemoveMutation,
  useAdminGetAllCartQuery,
} = cartApi;

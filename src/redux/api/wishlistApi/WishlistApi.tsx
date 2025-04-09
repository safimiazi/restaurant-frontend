import { baseApi } from "../baseApi";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    wishlistPost: build.mutation({
      query: (data) => {
        return {
          url: "/wishlist/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["wishlist"],
    }),
    wishlistUpdate: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/wishlist/update/${id}`,
          method: "PUT",
          body: data,
        };
      },
    }),

    wishlistDelete: build.mutation({
      query: ({ userId, productId }) => ({
        url: `/wishlist`,
        method: "POST",
        body: { userId, productId },
      }),
      invalidatesTags: ["wishlist"],

    }),
    wishlistSoftDelete: build.mutation({
      query: ({ id }) => ({
        url: `/wishlist/softDelete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],

    }),
    bulkDelete: build.mutation({
      query: ({ ids }) => ({
        url: `/wishlist/bulk`,
        method: "POST",
        body: { ids },
      }),
    }),
    getwishlistData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/wishlist/admin_get_wishlists",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
    }),

    getSinglewishlistData: build.query({
      query: () => ({
        url: `/wishlist/for_single_user`,
        method: "GET",
      }),
      providesTags: ["wishlist"],
    }),
  }),

  overrideExisting: false,
});

export const {
    useWishlistDeleteMutation,
    useWishlistPostMutation,
    useWishlistUpdateMutation,
    useGetwishlistDataQuery,
    useBulkDeleteMutation,
    useGetSinglewishlistDataQuery,
    useWishlistSoftDeleteMutation,

} = wishlistApi;

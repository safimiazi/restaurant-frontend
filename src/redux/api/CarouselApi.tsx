import { baseApi } from "./baseApi";

const CarouselApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCarousel: build.mutation({
      invalidatesTags: ["carousel"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে

      query: (data) => {
        return {
          url: "/carousel/createCarousel",
          method: "POST",
          body: data,
        };
      },
    }),
    update: build.mutation({
      invalidatesTags: ["carousel"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে

      query: ({ data, id }) => ({
        url: `/carousel/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    carouselSoftDelete: build.mutation({
      invalidatesTags: ["carousel"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে

      query: ({ id }) => ({
        url: `/carousel/deleteCarousel/${id}`,
        method: "DELETE",
      }),
    }),
    bulkSoftDelete: build.mutation({
      query: (ids) => {
        return {
          url: "/carousel/bulk-delete",
          method: "DELETE",
          body: { ids }, // Ensure this is an array of valid ObjectIds
        };
      },
      invalidatesTags: ["carousel"],
    }),

    getAllCarouselPhoto: build.query({
      providesTags: ["carousel"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে

      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/carousel/get-all",
        method: "GET",
        params: {
          pageSize,
          pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateCarouselMutation,
  useUpdateMutation,
  useCarouselSoftDeleteMutation,
  useBulkSoftDeleteMutation,
  useGetAllCarouselPhotoQuery,
} = CarouselApi;

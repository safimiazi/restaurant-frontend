import { baseApi } from "../baseApi";

const UserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    userSoftDelete: build.mutation({
      invalidatesTags: ["user"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে

      query: ({ id }) => ({
        url: `/user/soft_delete/${id}`,
        method: "DELETE",
      }),
    }),


    getAllCustomer: build.query({
      providesTags: ["user"], // নতুন ডাটা যোগ হলে পুরনো ক্যাশ ইনভ্যালিড হবে

      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/user/get_all_customer",
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
useGetAllCustomerQuery,
useUserSoftDeleteMutation
} = UserApi;

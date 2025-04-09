import { baseApi } from "../baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    placeOrder: build.mutation({
      query: (orderData) => ({
        url: "/orders/create",
        method: "POST",
        body: orderData,
      }),
    }),
    confirmOrder: build.mutation({
      query: ({orderId}) => ({
        url: "/orders/admin_confirm_order",
        method: "POST",
        body: {orderId},
      }),
    }),
    cancelOrder: build.mutation({
      query: ({orderId}) => ({
        url: "/orders/admin_cancel_order",
        method: "POST",
        body: {orderId},
      }),
    }),
    initiateSSLCommerz: build.mutation({
      query: (orderData) => ({
        url: "/orders/sslcommerz",
        method: "POST",
        body: orderData,
      }),
    }),
    getOrderData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/orders/get_orders",
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

export const { usePlaceOrderMutation, useInitiateSSLCommerzMutation, useCancelOrderMutation, useGetOrderDataQuery , useConfirmOrderMutation} =
  orderApi;

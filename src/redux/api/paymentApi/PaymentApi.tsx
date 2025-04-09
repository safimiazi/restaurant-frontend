import { baseApi } from "../baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyCoupon: builder.mutation({
        query: ({ code, cartTotal }) => ({
          url: '/coupon/apply',
          method: 'POST',
          body: { code, cartTotal }
        }),
      }),
      applyGiftCard: builder.mutation({
        query: ({ code, cartTotal }) => ({
          url: '/giftcard/apply',
          method: 'POST',
          body: { code, cartTotal }
        }),
      }),
      getCoupons: builder.query({
        query: () => '/coupons',
      }),
      getGiftCards: builder.query({
        query: () => '/giftcards',
      }),

  
  }),

  overrideExisting: false,
});

export const {
    useApplyCouponMutation,
    useApplyGiftCardMutation,
    useGetCouponsQuery,
    useGetGiftCardsQuery,
  

} = paymentApi;

import { PaymentPayload, PaymentResponse, Product } from '@utils/types/product';
import { baseAPI } from '../api';
import { OrdersResponse } from '@utils/types/order';

const orderEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      { message: string; order: any },
      { shippingAddress: string }
    >({
      query: () => ({
        url: `/order`,
        method: 'POST',
      }),
      invalidatesTags: ['orders'],
    }),
    getOrders: builder.query<OrdersResponse, void>({
      query: () => ({
        url: `/order`,
        method: 'GET',
      }),
      providesTags: ['orders'],
    }),
    removeFromCart: builder.mutation<
      { message: string },
      { productId: string }
    >({
      query: ({ productId }) => ({
        url: `/cart/${productId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['cart'],
    }),
    payWithMomo: builder.mutation<PaymentResponse, PaymentPayload>({
      query: () => ({
        url: `/pay/momo`,
        method: 'POST',
      }),
    }),
    clearCart: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: `/cart`,
        method: 'PUT',
      }),
      invalidatesTags: ['cart'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useRemoveFromCartMutation,
  usePayWithMomoMutation,
  useClearCartMutation,
} = orderEndpoints;

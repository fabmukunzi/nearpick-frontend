import { Product } from '@utils/types/product';
import { baseAPI } from '../api';

const cartEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation<
      { message: string; cart: any },
      { productId: string; productQuantity: number }
    >({
      query: (body) => ({
        url: `/cart`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['cart'],
    }),
    getCart: builder.query<{ total: number; products: Product[] }, void>({
      query: () => ({
        url: `/cart`,
        method: 'GET',
      }),
      providesTags: ['cart'],
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
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} = cartEndpoints;

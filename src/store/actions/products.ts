import { baseAPI } from '../api';
import {
  Product,
  ProductUrlParams,
  ProductsResponse,
} from '../../utils/types/product';

const productEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductUrlParams>({
      query: ({ lng, lat }) => ({
        url: `/products?long=${lng}&lat=${lat}`,
        method: 'GET',
      }),
      providesTags: ['products'],
    }),
    createProduct: builder.mutation<{ message: string }, FormData>({
      query: (body) => ({
        url: `/products`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['products'],
    }),
    getSingleProduct: builder.query<
      { product: Product; message: string },
      { id?: string }
    >({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
} = productEndpoints;

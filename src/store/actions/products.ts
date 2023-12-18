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
    deleteProduct: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['products'],
    }),
    updateProduct: builder.mutation<{ message: string }, {id:string,body:FormData}>({
      query: ({id,body}) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productEndpoints;

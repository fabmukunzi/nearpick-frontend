import { baseAPI } from '../api';
import {
  Product,
  ProductUrlParams,
  ProductsResponse,
} from '../../utils/types/product';
import { IStoresResponse, ShopPayload, Store } from '@utils/types/store';

const shopsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query<IStoresResponse, ProductUrlParams>({
      query: ({ lng, lat }) => ({
        url: `/stores?lng=${lng}&lat=${lat}`,
        method: 'GET',
      }),
      providesTags: ['stores'],
    }),
    getSingleShop: builder.query<{ store: Store }, { id: string }>({
      query: ({ id }) => ({
        url: `/stores/${id}`,
        method: 'GET',
      }),
    }),
    getShopProducts: builder.query<
      { products: { rows: Product[] } },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/stores/${id}/products`,
        method: 'GET',
      }),
    }),
    createShop: builder.mutation<{ message: string }, ShopPayload>({
      query: (body) => ({
        url: `/stores`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['stores'],
    }),
    getUserStores: builder.query<{ stores: Store[] }, void>({
      query: () => ({
        url: `/users/stores`,
        method: 'GET',
      }),
    }),
    deleteShop: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/stores/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['stores'],
    }),
  }),
});

export const {
  useGetShopsQuery,
  useGetSingleShopQuery,
  useGetShopProductsQuery,
  useCreateShopMutation,
  useGetUserStoresQuery,
  useDeleteShopMutation,
} = shopsEndpoints;

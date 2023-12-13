import { baseAPI } from '../api';
import {
  Product,
  ProductUrlParams,
  ProductsResponse,
} from '../../utils/types/product';
import { IStoresResponse, Store } from '@utils/types/store';

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
  }),
});

export const {
  useGetShopsQuery,
  useGetSingleShopQuery,
  useGetShopProductsQuery,
} = shopsEndpoints;

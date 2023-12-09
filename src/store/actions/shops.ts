import { baseAPI } from '../api';
import { ProductUrlParams, ProductsResponse } from '../../utils/types/product';
import { IStoresResponse } from '@utils/types/store';

const shopsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query<IStoresResponse, ProductUrlParams>({
      query: ({ lng, lat }) => ({
        url: `/stores?lng=${lng}&lat=${lat}`,
        method: 'GET',
      }),
      providesTags: ['stores'],
    }),
  }),
});

export const { useGetShopsQuery } = shopsEndpoints;

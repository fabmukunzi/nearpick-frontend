import { baseAPI } from '../api';
import { ProductUrlParams, ProductsResponse } from '../../utils/types/product';

const productEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductUrlParams>({
      query: ({lng,lat}) => ({
        url: `/products?lng=${lng}&lat=${lat}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productEndpoints;

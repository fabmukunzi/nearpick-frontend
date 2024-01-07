import { Sale } from '@utils/types/product';
import { baseAPI } from '../api';

const salesEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSellerSales: builder.query<{ message: string; data: Sale[] }, void>({
      query: (body) => ({
        url: `/sales`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetSellerSalesQuery } = salesEndpoints;

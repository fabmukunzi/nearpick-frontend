import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './index';
import { BASE_API_URL } from '@utils/constants';

export const baseAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: async (headers, { getState }) => {
      const {
        userReducer: { token },
      } = getState() as RootState;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    'profile',
    'users',
    'products',
    'stores',
    'cart',
    'categories',
    'orders',
  ],
  endpoints: () => ({}),
});

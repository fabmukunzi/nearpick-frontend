import { ICategory } from '@utils/types/categories';
import { baseAPI } from '../api';

const categoryEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<{ categories: ICategory[] }, void>({
      query: () => ({
        url: `/categories`,
        method: 'GET',
      }),
      providesTags: ['categories'],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryEndpoints;

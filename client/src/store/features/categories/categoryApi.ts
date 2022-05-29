import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { buildBaseQuery } from '../../baseQuery';
import { ICategory } from './categoriesTypes';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: buildBaseQuery('categories'),
  endpoints: builder => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: '',
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;

export default categoryApi;

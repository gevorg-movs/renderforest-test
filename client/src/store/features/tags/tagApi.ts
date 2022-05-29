import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { buildBaseQuery } from '../../baseQuery';
import { ITag } from './tagsTypes';

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: buildBaseQuery('tags'),
  endpoints: builder => ({
    getTags: builder.query<ITag[], void>({
      query: () => ({
        url: '',
      }),
    }),
  }),
});

export const { useGetTagsQuery } = tagApi;

export default tagApi;

import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { buildBaseQuery } from '../../baseQuery';
import { IRegion } from './regionsTypes';

export const regionApi = createApi({
  reducerPath: 'regionApi',
  baseQuery: buildBaseQuery('regions'),
  endpoints: builder => ({
    getRegions: builder.query<IRegion[], void>({
      query: () => ({
        url: '',
      }),
    }),
  }),
});

export const { useGetRegionsQuery } = regionApi;

export default regionApi;

import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { buildBaseQuery } from '../../baseQuery';
import { ICity } from './citiesTypes';

export const cityApi = createApi({
  reducerPath: 'cityApi',
  baseQuery: buildBaseQuery('cities'),
  endpoints: builder => ({
    getCities: builder.query<ICity[], string | number>({
      query: regionId => ({
        url: '',
        // @ts-ignore
        params: new URLSearchParams({ regionId }),
      }),
    }),

    getCity: builder.query<ICity, string | number>({
      query: cityId => ({
        url: `/${cityId}`,
      }),
    }),
  }),
});

export const { useGetCitiesQuery, useGetCityQuery } = cityApi;

export default cityApi;

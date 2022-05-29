import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from './index';

export const buildBaseQuery = (basePath: string) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  return fetchBaseQuery({
    baseUrl: `${baseUrl}/${basePath}`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;

      headers.append('Authorization', `Bearer ${state.auth.accessToken}`);

      return headers;
    },
  });
};

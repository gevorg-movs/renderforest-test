import { createApi } from '@reduxjs/toolkit/query/react';
import { buildBaseQuery } from '../../baseQuery';
import { IRegisterData, IUser } from './authTypes';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: buildBaseQuery('auth'),
  endpoints: builder => ({
    login: builder.mutation<
      { user: IUser; accessToken: string },
      { email: string; password: string }
    >({
      query: data => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),

    register: builder.mutation<
      { user: IUser; accessToken: string },
      IRegisterData
    >({
      query: data => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
    }),

    getCurrentUser: builder.query<IUser, void>({
      query: () => ({
        url: '/getCurrentUser',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetCurrentUserQuery,
} = authApi;

export default authApi;

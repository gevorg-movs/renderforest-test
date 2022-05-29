import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { buildBaseQuery } from '../../baseQuery';
import { IAnnouncement } from '../announcements/announcementsTypes';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: buildBaseQuery('users'),
  endpoints: builder => ({
    getUserAnnouncements: builder.query<IAnnouncement[], void>({
      query: () => {
        return {
          url: 'myAnnouncements',
        };
      },
      keepUnusedDataFor: 1,
    }),
  }),
});

export const { useGetUserAnnouncementsQuery } = userApi;

export default userApi;

import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { buildBaseQuery } from '../../baseQuery';
import { IAnnouncement, INewAnnouncement } from './announcementsTypes';
import { ITag } from '../tags/tagsTypes';
import { ICity } from '../cities/citiesTypes';
import { IRegion } from '../regions/regionsTypes';
import { ICategory } from '../categories/categoriesTypes';

export const announcementApi = createApi({
  reducerPath: 'announcementApi',
  baseQuery: buildBaseQuery('announcements'),
  tagTypes: ['Announcement'],
  endpoints: builder => ({
    getAnnouncements: builder.query<IAnnouncement[], any>({
      query: filter => {
        const params = new URLSearchParams(filter);

        params.delete('tags');
        filter?.tags?.forEach((tag: ITag) =>
          params.append('tagIds[]', String(tag.id))
        );

        return {
          url: '',
          params,
        };
      },
      keepUnusedDataFor: 1,
      providesTags: ['Announcement'],
    }),

    getAnnouncement: builder.query<
      {
        announcement: IAnnouncement;
        city: ICity;
        region: IRegion;
        category: ICategory;
      },
      number | string
    >({
      query: announcementId => ({
        url: `/${announcementId}`,
      }),
      keepUnusedDataFor: 1,
      providesTags: ['Announcement'],
    }),

    addAnnouncement: builder.mutation<any, INewAnnouncement | FormData>({
      query: newAnnouncement => ({
        url: '/',
        method: 'POST',
        body: newAnnouncement,
      }),
      invalidatesTags: ['Announcement'],
    }),

    updateAnnouncement: builder.mutation<
      any,
      { announcementId: string | number; data: any }
    >({
      query: ({ announcementId, data }) => ({
        url: `${announcementId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Announcement'],
    }),

    deleteAnnouncement: builder.mutation<any, string | number>({
      query: announcementId => ({
        url: `/${announcementId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Announcement'],
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
  useGetAnnouncementQuery,
  useAddAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useUpdateAnnouncementMutation,
} = announcementApi;

export default announcementApi;

import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { buildBaseQuery } from '../../baseQuery';
import { IImage } from './imagesTypes';

export const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: buildBaseQuery('images'),
  endpoints: builder => ({
    uploadAnnouncementImage: builder.mutation<
      any,
      { announcementId: number | string; image: File }
    >({
      query: ({ announcementId, image }) => {
        const formData = new FormData();
        formData.append('announcementId', String(announcementId));
        formData.append('image', image);

        return {
          url: `/${announcementId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    deleteAnnouncementImage: builder.mutation<any, IImage>({
      query: image => ({
        url: `/${image.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useDeleteAnnouncementImageMutation,
  useUploadAnnouncementImageMutation,
} = imageApi;

export default imageApi;

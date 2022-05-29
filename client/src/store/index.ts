import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import authSlice from './features/auth/authSlice';
import authApi from './features/auth/authApi';
import announcementApi from './features/announcements/announcementApi';
import regionApi from './features/regions/regionApi';
import cityApi from './features/cities/cityApi';
import categoryApi from './features/categories/categoryApi';
import tagApi from './features/tags/tagApi';
import userApi from './features/users/userApi';
import imageApi from './features/images/imageApi';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [announcementApi.reducerPath]: announcementApi.reducer,
    [regionApi.reducerPath]: regionApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat([
      authApi.middleware,
      announcementApi.middleware,
      regionApi.middleware,
      cityApi.middleware,
      categoryApi.middleware,
      tagApi.middleware,
      userApi.middleware,
      imageApi.middleware,
    ]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

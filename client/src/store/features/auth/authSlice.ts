import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from './authTypes';

const initialState: IAuthState = {
  accessToken: localStorage.getItem('accessToken') || '',
  error: '',
  user: {
    id: 0,
    name: '',
    email: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
      localStorage.setItem('accessToken', payload.accessToken);
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    logout: state => {
      state.accessToken = '';
      state.user = initialState.user;
      localStorage.removeItem('accessToken');
    },
  },
});

export const { logout, setCredentials, setUser } = authSlice.actions;

export default authSlice;

import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useTypedSelector } from './store';
import {
  AddAnnouncement,
  Announcements,
  EditAnnouncement,
  Login,
  MyAnnouncements,
  Register,
  ShowAnnouncement,
} from './pages';
import { useLazyGetCurrentUserQuery } from './store/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { logout, setUser } from './store/features/auth/authSlice';

function App() {
  const dispatch = useDispatch();

  const { accessToken } = useTypedSelector(state => state.auth);
  const [getCurrentUser] = useLazyGetCurrentUserQuery();

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    getCurrentUser()
      .unwrap()
      .then(user => {
        dispatch(setUser(user));
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [accessToken]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/announcements" element={<Announcements />} />
        <Route
          path="/announcements/:announcementId/show"
          element={<ShowAnnouncement />}
        />
        {!accessToken ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/announcements/add" element={<AddAnnouncement />} />

            <Route
              path="/announcements/:announcementId/edit"
              element={<EditAnnouncement />}
            />
            <Route
              path="/profile/myAnnouncements"
              element={<MyAnnouncements />}
            />
          </>
        )}
        <Route path="/" element={<Announcements />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

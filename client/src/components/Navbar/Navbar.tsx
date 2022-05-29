import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useTypedSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/features/auth/authSlice';

const ResponsiveAppBar = () => {
  const { accessToken, user } = useTypedSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link
            to="/"
            style={{
              color: 'inherit',
              textDecoration: 'none',
            }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: 'flex',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
              LOGO
            </Typography>
          </Link>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            flexGrow={1}>
            {accessToken ? (
              <Stack flexDirection="row">
                <Link to="/profile/myAnnouncements">
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    My announcements
                  </Button>
                </Link>

                <Link to="/announcements/add">
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    Add announcement
                  </Button>
                </Link>
              </Stack>
            ) : (
              <Link to="/announcements/">
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  All announcements
                </Button>
              </Link>
            )}

            <Stack>
              {accessToken ? (
                <Stack flexDirection="row">
                  <Typography
                    variant="h6"
                    sx={{
                      mr: 2,
                    }}>
                    {user.email}
                  </Typography>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => dispatch(logout())}>
                    Logout
                  </Button>
                </Stack>
              ) : (
                <Stack flexDirection="row" justifyContent="space-between">
                  <Link to="/login">
                    <Button
                      sx={{ marginRight: 2 }}
                      variant="contained"
                      color="secondary">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="contained" color="secondary">
                      Register
                    </Button>
                  </Link>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

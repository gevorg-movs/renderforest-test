import React from 'react';
import LoginForm from './LoginForm';
import useStyles from './styles';
import Layout from '../../components/Layout';
import { Box, Typography } from '@mui/material';

const Login = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.root}>
        <Box className={classes.loginFormContainer}>
          <Typography variant="h2">Login</Typography>

          <LoginForm />
        </Box>
      </div>
    </Layout>
  );
};

export default Login;

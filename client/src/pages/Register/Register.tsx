import React from 'react';
import RegisterForm from './RegisterForm';
import useStyles from './styles';
import Layout from '../../components/Layout';
import { Box, Typography } from '@mui/material';

const Register = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.root}>
        <Box className={classes.loginFormContainer}>
          <Typography variant="h2">Register</Typography>

          <RegisterForm />
        </Box>
      </div>
    </Layout>
  );
};

export default Register;

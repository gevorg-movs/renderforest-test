import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useStyles from './styles';
import { useLoginMutation } from '../../../store/features/auth/authApi';
import { setCredentials } from '../../../store/features/auth/authSlice';
import { ILoginData } from '../../../store/features/auth/authTypes';
import { Button, TextField, Typography } from '@mui/material';

const initialValues: ILoginData = {
  email: 'admin@admin.com',
  password: '123456',
};

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();

  const [login, result] = useLoginMutation();

  const onSubmit = async (values: ILoginData) => {
    try {
      const response = await login(values).unwrap();
      console.log(response);

      dispatch(setCredentials(response));
    } catch (e) {
      console.log(e);
    }
  };

  const classes = useStyles();

  const validationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const error = useMemo(() => {
    // @ts-ignore
    return result?.error?.data?.code;
  }, [result]);

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <TextField
        name="email"
        label="Email"
        value={values.email}
        onChange={handleChange}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        sx={{ marginBottom: 3 }}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        value={values.password}
        onChange={handleChange}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password}
        sx={{ marginBottom: 3 }}
      />

      <Typography textAlign="center" color="error" marginY={1}>
        {error}
      </Typography>

      <div className={classes.submitButtonContainer}>
        <Button type="submit" variant="outlined">
          Log In
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

import React, { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useStyles from './styles';
import { useRegisterMutation } from '../../../store/features/auth/authApi';
import { setCredentials } from '../../../store/features/auth/authSlice';
import { IRegisterData } from '../../../store/features/auth/authTypes';
import { Button, TextField, Typography } from '@mui/material';

const initialValues: IRegisterData = {
  email: 'admin@admin.com',
  name: 'Name',
  password: '123456',
  passwordConfirmation: '123456',
};

const RegisterForm: FC = () => {
  const dispatch = useDispatch();

  const [register, result] = useRegisterMutation();

  const onSubmit = async (values: IRegisterData) => {
    try {
      const response = await register(values).unwrap();
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
        name="name"
        label="Name"
        value={values.name}
        onChange={handleChange}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
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

      <TextField
        name="passwordConfirmation"
        label="Password Confirmation"
        type="password"
        value={values.passwordConfirmation}
        onChange={handleChange}
        error={
          touched.passwordConfirmation && Boolean(errors.passwordConfirmation)
        }
        helperText={touched.passwordConfirmation && errors.passwordConfirmation}
        sx={{ marginBottom: 3 }}
      />

      <Typography textAlign="center" color="error" marginY={1}>
        {error}
      </Typography>

      <div className={classes.submitButtonContainer}>
        <Button type="submit" variant="outlined">
          Register
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;

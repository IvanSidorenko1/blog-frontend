import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { fetchRegistr, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  
  const {
      register, 
      handleSubmit, 
      formState: {errors, isValid}
    } = useForm({
    defaultValues: {
      email: '',
      fullName: '',
      password: ''
    },
    mode: 'onChange',
  });
  
    
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegistr(values));
    console.log(data);
    if(!data.payload){
      return alert('user do not registration')

    }
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token);
    } 
  };
  
  // React.useEffect()


  if(isAuth){
   return <Navigate to="/"/>;
  }


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Створення акаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField 
               error={Boolean(errors.fullName ?.message)}
               helperText={errors.fullName ?.message}
               {...register('fullName', {required: "dont fullName"})}
               fullWidth
               className={styles.field} 
               label="Повне ім'я"/>
      <TextField 
              type="email"
               error={Boolean(errors.email ?.message)}
               helperText={errors.email ?.message}
               {...register('email', {required: "dont mail"})}
               fullWidth
               className={styles.field} 
               label="E-Mail"/>
      <TextField 
               type='password'
               error={Boolean(errors.password ?.message)}
               helperText={errors.password ?.message}
               {...register('password', {required: "dont password"})}
               fullWidth
               className={styles.field} 
               label="Пароль"/>
      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Зареєструватися
      </Button>
    </form>
    </Paper>
  );
};

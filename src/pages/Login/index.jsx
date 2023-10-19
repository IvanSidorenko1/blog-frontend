import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import {useForm} from "react-hook-form";

import styles from "./Login.module.scss";

import {fetchAuth, selectIsAuth} from '../../redux/slices/auth'

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);

    const dispatch = useDispatch();
    
    const {
        register, 
        handleSubmit, 
        setError, 
        formState: {errors, isValid}
      } = useForm({
      defaultValues: {
        email: 'sda@a.com',
        password: 'a11111'
      },
      mode: 'onChange',
    });
    
    
    const onSubmit = async (values) => {
      const data = await dispatch(fetchAuth(values));
      console.log(data);
      if(!data.payload){
        return alert('user do not login')

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
            Вхiд до облікового запиту
          </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
           <TextField
               className={styles.field}
               label="E-Mail"
               type="email"
               error={Boolean(errors.email ?.message)}
               helperText={errors.email ?.message}
               {...register('email', {required: "dont mail"})}
               fullWidth
             />
             <TextField 
                className={styles.field} 
                label="Пароль" 
                fullWidth 
                error={Boolean(errors.password ?.message)}
                helperText={errors.password ?.message}
                {...register('password', {required: "dont password"})}/>
             <Button type="submit" size="large" variant="contained" fullWidth>
               Ввійти
             </Button>
        </form>
        </Paper>
      );
  };
    
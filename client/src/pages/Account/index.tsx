import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccountHeader, CustomInput, MyAllert } from '../../components';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import styles from './index.module.scss'
import { ICreateUserFormState } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAsyncAction, registrAsyncAction, selectUser } from '../../store/features/user/userSlice';


export const Account = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let pageName = location.pathname.split('/')[2];
  
  const dispatch = useAppDispatch();
  const {isAuth, error } = useAppSelector(selectUser);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ICreateUserFormState>();

  const onSubmit = (formData: ICreateUserFormState) => {
    const { userName, email, password } = formData;
    if(pageName === 'registration') {
      dispatch(registrAsyncAction({userName, email, password}))
    } else {
      dispatch(loginAsyncAction({email, password}))
    }
    reset();
  }

  useEffect(() => {
    if (isAuth){
      return navigate("/create");
    }
    return () => {
      reset()
    }
  },[isAuth, navigate, reset]);

  return <div className={styles.AccountPage}>
      <MyAllert severity='error' open={!!error}>
        {error}
      </MyAllert>   
    <div className={styles.AccountPageWrapper}>
      <AccountHeader route={pageName}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formWrapper}>
          {pageName === 'login' ? null : (
            <CustomInput
              id="outlined-required"
              className={styles.formInut}
              label="User Name"
              {...register('userName', { required: { value: true, message: 'Pleace enter user name'}, minLength: 6, maxLength: 32})} 
              error={errors.userName}
            /> 
          )}
          <CustomInput
            id="email"
            className={styles.formInut}
            label="Email"
            {...register('email', { required: { value: true, message: 'Pleace enter email'}, 
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }})} 
            error={errors.email}
          />
          <CustomInput
            id="outlined-password-input"
            className={styles.formInut}
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register('password', { required: { value: true, message: 'Pleace enter passsword'}, minLength: 6, maxLength: 32})} 
            error={errors.password}
          />
          <Button variant="contained" color="primary" type="submit" className={styles.formInut}>
            {pageName === 'login' ? 'LogIn' : 'Sign Up'}
          </Button>
        </div>
      </form>
    </div>
  </div>;
};

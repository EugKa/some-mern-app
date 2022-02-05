import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccountHeader, CustomInput } from '../../components';
import { Box, Button, CircularProgress } from '@mui/material';
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
  const user = useAppSelector(selectUser);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ICreateUserFormState>();

  const onSubmit = (formData: ICreateUserFormState) => {
    const { userName, email, password } = formData;
    console.log('formData', formData);
    if(pageName === 'registration') {
      console.log('registration');
      dispatch(registrAsyncAction({userName, email, password}))
    } else {
      console.log('login');
      dispatch(loginAsyncAction({email, password}))
    }
    reset();
  }

  

  useEffect(() => {
    if (user.isAuth){
      return navigate("/create");
    }
 },[user.isAuth, navigate]);

 if(user.status === 'loading') {
  return (
     <Box sx={{ display: 'flex' }}>
        <CircularProgress />
     </Box>
  )
}
  
  return <div className={styles.AccountPage}>
    <div className={styles.AccountPageWrapper}>
      <AccountHeader route={pageName}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formWrapper}>
          {pageName === 'login' ? null : (
            <CustomInput
              className={styles.formInut}
              label="User Name"
              {...register('userName', { required: { value: true, message: 'Pleace enter user name'}, minLength: 6, maxLength: 32})} 
              error={errors.userName}
            /> 
          )}
          <CustomInput
            className={styles.formInut}
            label="Email"
            {...register('email', { required: { value: true, message: 'Pleace enter email'}})} 
            error={errors.email}
          />
          <CustomInput
            className={styles.formInut}
            label="Password"
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

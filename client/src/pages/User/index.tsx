import React from 'react';
import { selectUser } from '../../store/features/user/userSlice';
import { useAppSelector } from '../../store/hooks';
import { CircularProgress, Box, Card, Button } from '@mui/material/';
import styles from './index.module.scss'
import { CustomInput, UserInfo } from '../../components';
import { useForm } from 'react-hook-form';
import { ICreatePostFormState } from '../../interfaces';


export const User = () => {
   const user = useAppSelector(selectUser);
   const { userData, status } = user;

   const { register, handleSubmit, formState: { errors }, reset } = useForm<ICreatePostFormState>();
   const onSubmit = (formData: ICreatePostFormState) => {
      const { title, description } = formData;
      console.log('formData', formData);
      reset();
    }

   if(status === 'loading') {
      return (
         <Box sx={{ display: 'flex' }}>
            <CircularProgress />
         </Box>
      )
   }

   return <div className={styles.userPage}>
      <UserInfo/>
      <Card>
         <form onSubmit={handleSubmit(onSubmit)}>
         <div className={styles.formWrapper}>
            <CustomInput
               className={styles.formInut}
               label="Title"
               {...register('title', { required: { value: true, message: 'Pleace enter title'}, minLength: 6, maxLength: 32})} 
               error={errors.title}
            />
            <CustomInput
               className={styles.formInut}
               label="Description"
               {...register('description', { required: { value: true, message: 'Pleace enter description'}, minLength: 6, maxLength: 32})} 
               error={errors.description}
            />
            <Button variant="contained" color="primary" type="submit" className={styles.formInut}>
               Create post
            </Button>
         </div>
         </form>
      </Card>
   </div>;
};

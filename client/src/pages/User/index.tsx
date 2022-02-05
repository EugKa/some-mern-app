import React, { useEffect } from 'react';
import { selectUser } from '../../store/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CircularProgress, Box, Button, Grid } from '@mui/material/';
import styles from './index.module.scss'
import { CustomInput, PostItem, UserInfo } from '../../components';
import { useForm } from 'react-hook-form';
import { ICreatePostFormState, IPost } from '../../interfaces';
import { createPostAsyncAction, getUserPostsAsyncAction, selectPosts } from '../../store/features/posts/postsSlice';
import { isIterationStatement } from 'typescript';


export const User = () => {
   const user = useAppSelector(selectUser);
   const { userPosts } = useAppSelector(selectPosts);

   const dispatch = useAppDispatch();
   const { userData, status } = user;

   const { register, handleSubmit, formState: { errors }, reset } = useForm<ICreatePostFormState>();
   const onSubmit = (formData: ICreatePostFormState) => {
      const { title, description } = formData;
      console.log('CREATE POST FORM', formData, userData.id);
      dispatch(createPostAsyncAction({owner: userData.id, title, description}))
      reset();
   }

   useEffect(() => {
      dispatch(getUserPostsAsyncAction(userData.id))
   }, [dispatch, userData.id])

   if(status === 'loading') {
      return (
         <Box sx={{ display: 'flex' }}>
            <CircularProgress />
         </Box>
      )
   }

   return <div className={styles.userPage}>
      <UserInfo/>
      <div className={styles.card}>
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
      </div>
      <Grid container>
         {userPosts.map((item: IPost) => {
            return <PostItem post={item} key={item._id}/>
         })}
      </Grid>
   </div>;
};

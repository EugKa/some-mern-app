import React, {  Suspense } from 'react';
import { selectUser } from '../../store/features/';
import { useAppSelector } from '../../store/hooks';
import { CircularProgress, Box, Divider } from '@mui/material/';
import styles from './index.module.scss'
import { CreateBookAnnouncementForm, UserInfo } from '../../components';

const BookAnnouncementList = React.lazy(() => import('../../components/BookAnnouncementsList'));


export const CreatePage = () => {
   const { status } = useAppSelector(selectUser);

   if(status === 'loading') {
      return (
         <Box sx={{ display: 'flex' }}>
            <CircularProgress />
         </Box>
      )
   }

   return <div className={styles.userPage}>
      <UserInfo/>
      <CreateBookAnnouncementForm/>
      <Divider variant="fullWidth" className={styles.divider}/>
      <Suspense fallback={<div>LOADING...</div>}>
         <BookAnnouncementList/>
      </Suspense>
   </div>;
};
import React, { useEffect } from 'react';
import { selectUser } from '../../store/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CircularProgress, Box, Grid, Divider } from '@mui/material/';
import styles from './index.module.scss'
import { BookUser, CreateAnnouncementForm, UserInfo } from '../../components';
import { IBook } from '../../interfaces';
import { 
   deleteBookAnnouncementAsyncAction, 
   selectbookAnnouncements,
   getUserBookAnnouncementsAsyncAction
} from '../../store/features';

export const User = () => {
   const { userData, status } = useAppSelector(selectUser);
   const { userBookAnnouncements, bookAnnouncements } = useAppSelector(selectbookAnnouncements);
   const dispatch = useAppDispatch();


   const handleDelete = (id: string) => {
      dispatch(deleteBookAnnouncementAsyncAction(id))
   }


   useEffect(() => {
      dispatch(getUserBookAnnouncementsAsyncAction(userData!.id))
   }, [dispatch, userData?.id, bookAnnouncements, userData])

   if(status === 'loading') {
      return (
         <Box sx={{ display: 'flex' }}>
            <CircularProgress />
         </Box>
      )
   }

   return <div className={styles.userPage}>
      <UserInfo/>
      <CreateAnnouncementForm/>
      <Divider variant="fullWidth" className={styles.divider}/>
      <Grid container>
         <Grid item lg={12} md={12} sm={12} xs={12}>
            <h1 className={styles.announcementsTitile}>Your Book Announcements</h1>
         </Grid>
         {userBookAnnouncements.length === 0 ? 
            (
               <div>No Data</div>
            ) : (
               <>
                  {userBookAnnouncements.map((item: IBook) => {
                     return <BookUser 
                        book={item} 
                        key={item._id} 
                        handleDelete={handleDelete}
                     />
                  })}
               </> 
            )
         }
      </Grid>
   </div>;
};

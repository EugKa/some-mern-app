import React, { useEffect } from 'react'
import { CircularProgress, Box, Grid } from '@mui/material/';
import { 
   deleteBookAnnouncementAsyncAction, 
   selectbookAnnouncements,
   getUserBookAnnouncementsAsyncAction,
   selectUser
} from '../../store/features';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './index.module.scss'
import { BookUser } from '../';
import { IBook } from '../../interfaces';


const BookAnnouncementList = () => {
   const { userData } = useAppSelector(selectUser);

   const { userBookAnnouncements, bookAnnouncements, status } = useAppSelector(selectbookAnnouncements);
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

   return (
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
   )
}
export default BookAnnouncementList
import React, { useEffect } from 'react';
import { getAllBookAnnouncementsAsyncAction, selectbookAnnouncements, selectUser } from '../../store/features';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CircularProgress, Box, Grid } from '@mui/material/';
import { IBook } from '../../interfaces';
import { BookPreviewItem, MyAllert } from '../../components';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { bookAnnouncements, status } = useAppSelector(selectbookAnnouncements);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if(status === 'idle') {
      dispatch(getAllBookAnnouncementsAsyncAction())
    }
  },[dispatch, status])

  if(status === 'loading') {
    return (
       <Box sx={{ display: 'flex' }}>
        <CircularProgress />
       </Box>
    )
  }

  if(user.status === 'failed') {
    return (
      <MyAllert severity='error' open> 
        Something went wrong please try again
      </MyAllert> 
    )
  }

  if(bookAnnouncements.length === 0) {
    return (
      <div>No Data</div>
    )
  }

  return (
    <Grid container>          
      {bookAnnouncements.map((item: IBook) => {
        return <BookPreviewItem key={item._id} book={item}/>
      })}                            
    </Grid>
  )
};

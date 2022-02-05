import React, { useEffect } from 'react';
import { getAllPostsAsyncAction, selectPosts } from '../../store/features/posts/postsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CircularProgress, Box, Grid } from '@mui/material/';
import { IPost } from '../../interfaces';
import { PostItem } from '../../components';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { posts, status } = useAppSelector(selectPosts);

  

  useEffect(() => {
    dispatch(getAllPostsAsyncAction())
  },[dispatch])

  if(status === 'loading') {
    return (
       <Box sx={{ display: 'flex' }}>
          <CircularProgress />
       </Box>
    )
  }

  if(posts.length === 0) {
    return (
       <div>PUSTO</div>
    )
  }

  return  <Grid container>          
            {posts.map((item: IPost) => {
              return <PostItem key={item._id} post={item}/>
            })}                            
        </Grid>
};

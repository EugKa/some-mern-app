import React from 'react';
import { CardContent, Typography, Card, Grid } from '@mui/material/';
import { IPost } from '../../interfaces';
import styles from './index.module.scss'

interface PostItemProps {
   post: IPost
}

export const PostItem = ({post}: PostItemProps) => {
   return (
      <Grid item lg={3} md={4} sm={6} xs={12}>
         <Card className={styles.root}>
            <CardContent>
               <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {post.title}
               </Typography>
               <Typography variant="h5" component="div">
                  {post.description}
               </Typography>
            </CardContent>
         </Card>
      </Grid>
   )
};

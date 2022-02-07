import React from 'react';
import { CardContent, Typography, Card, Grid, CardActions, IconButton } from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { IPost } from '../../interfaces';
import styles from './index.module.scss'

interface PostItemProps {
   post: IPost;
   handleDelete?: (id: string) => void;
   handleUpdate?: (id: string) => void;
}

export const PostItem = ({post, handleDelete, handleUpdate}: PostItemProps) => {
   return (
      <Grid item lg={3} md={4} sm={6} xs={12}>
         <Card className={styles.root}>
            <CardContent>
               <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Title: {post.title}
               </Typography>
               <Typography variant="h5" component="div">
                  Description: {post.description}
               </Typography>
            </CardContent>
            {handleUpdate && handleDelete ? (
                  <CardActions disableSpacing>
                     <IconButton aria-label="add to favorites" onClick={() => handleDelete(post._id)}>
                        <DeleteIcon />
                     </IconButton>
                     <IconButton aria-label="share" onClick={() => handleUpdate(post._id)}>
                        <SystemUpdateAltIcon />
                     </IconButton>
                  </CardActions>
               ) : null
            }
            
         </Card>
      </Grid>
   )
};

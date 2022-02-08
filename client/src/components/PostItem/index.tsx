import React, { ChangeEvent, useState } from 'react';
import { CardContent, Typography, Card, Grid, CardActions, IconButton ,TextField } from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { IPost } from '../../interfaces';
import styles from './index.module.scss'
import { dateConvertor } from '../../utils';
import { useAppDispatch } from '../../store/hooks';
import { updatePostAsyncAction } from '../../store/features/posts/postsSlice';

interface PostItemProps {
   post: IPost;
   handleDelete?: (id: string) => void;
}

export const PostItem = ({ post, handleDelete }: PostItemProps) => {
   const { _id, title, description, createdAt } = post;
   const [isEdit, setIsEdit] = useState<boolean>(false);
   const [titleValue, setTitleValue] = useState(post.title)
   const [descriptionValue, setDescriptionValue] = useState(post.description)

   const dispatch = useAppDispatch();


   const handleEdit = () => {
      if (isEdit) {
         setIsEdit(false)
         console.log(`id:${_id} |titleValue:${titleValue}| descriptionValue:${descriptionValue}`);
         dispatch(updatePostAsyncAction({ id: _id, title: titleValue, description: descriptionValue }))
      } else {
         setIsEdit(true)
      }
   }

   return (
      <Grid item lg={3} md={4} sm={6} xs={12}>
         <Card className={styles.root}>
            <CardContent>
               {!isEdit ? (
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                     Title: {title}
                  </Typography>
                  ): (
                  <TextField id="filled-basic" label="Filled" variant="filled" 
                     value={titleValue} 
                     onChange={(e: ChangeEvent<HTMLInputElement>)=> setTitleValue!(e.target.value)}
                  />
               )}
               {!isEdit ? (
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                     Title: {description}
                  </Typography>
                  ): (
                  <TextField id="filled-basic" label="Filled" variant="filled" 
                     value={descriptionValue} 
                     onChange={(e: ChangeEvent<HTMLInputElement>)=> setDescriptionValue!(e.target.value)}
                  />
               )}
               <Typography variant="h5" component="div">
                  Created: {dateConvertor(createdAt)}
               </Typography>
            </CardContent>
            {handleDelete ? (
                  <CardActions disableSpacing>
                     <IconButton aria-label="add to favorites" onClick={() => handleDelete(post._id)}>
                        <DeleteIcon />
                     </IconButton>
                     <IconButton aria-label="share" onClick={() => handleEdit()}>
                        <SystemUpdateAltIcon />
                     </IconButton>
                  </CardActions>
               ) : null
            }  
         </Card>
      </Grid>
   )
};

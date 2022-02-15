import React, { useState } from 'react';
import { CardContent, Typography, Card, Grid, CardActions, IconButton ,Input } from '@mui/material/';
import {  IBook } from '../../interfaces';
import { dateConvertor } from '../../utils';
import { useAppDispatch } from '../../store/hooks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './index.module.scss'
import { useInput } from '../hooks';
import { updateBookAnnouncementAsyncAction } from '../../store/features';


interface BookUserProps {
   book: IBook;
   handleDelete: (id: string) => void;
}

export const BookUser = ({ book, handleDelete }: BookUserProps) => {
   const { _id ,author, title, description, createdAt, saler, type, tags, price } = book;
   const [edit, setEdit] = useState<boolean>(false);
   const bookTitle = useInput<string>(title);
   const bookDescr = useInput<string>(description);
   const bookPrice = useInput<number>(price);
   const dispatch = useAppDispatch();

   const isEqualTitle = bookTitle.value.toString() !== title.toString();
   const isEqualDescription = bookDescr.value.toString() !== description.toString();
   const isEqualPrice = bookPrice.value.toString() !== price.toString();
   
   const handleEdit = () => {
      if (edit) {
         setEdit(false)
         if(isEqualTitle || isEqualDescription || isEqualPrice) {
            dispatch(updateBookAnnouncementAsyncAction({ 
               id: _id, 
               title: bookTitle.value, 
               description: bookDescr.value, 
               price: bookPrice.value
            }))
         }
      } else {
         setEdit(true)
      }
   }

   return (
      <Grid item lg={6} md={6} sm={6} xs={12}>
         <Card className={styles.root}>
            <CardContent>
               <Typography sx={{ fontSize: 14 }} component="div" >
                 <AccountCircleIcon/> Saler: {saler}
               </Typography>
               <Typography>
                  Author: {author}
               </Typography>
               {edit ? (
                     <Input {...bookTitle} fullWidth/>
                  ) : (
                     <Typography>
                        {title}
                     </Typography>
                  )
               }
               {edit ? (
                     <Input {...bookDescr} fullWidth multiline={true}/>
                  ) : (
                     <Typography  color="text.secondary">
                        {description}
                     </Typography>
                  )
               }
               <div className={styles.info}>
                  <Typography component="span">
                     <strong>Type: </strong>{type};
                  </Typography>
                  <Typography component="span">
                     <strong>Tags: </strong>{tags};
                  </Typography>
               </div>
               <Typography>
                  <strong>Created: </strong>{dateConvertor(createdAt)}
               </Typography>
               {edit ? (
                     <Input {...bookPrice}/>
                  ) : (
                     <Typography component="span">
                        <strong>Price: </strong>{price}$;
                     </Typography>  
                  )
               }
            </CardContent>
            <CardActions disableSpacing>
               <IconButton aria-label="add to favorites" onClick={() => handleDelete(_id)}>
                  <DeleteIcon />
               </IconButton>
               <IconButton aria-label="share" onClick={() => handleEdit()}>
                  <SystemUpdateAltIcon />
               </IconButton>
            </CardActions>
         </Card>
      </Grid>
   )
};

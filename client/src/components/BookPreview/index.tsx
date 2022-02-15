import React from 'react';
import { CardContent, Typography, Card, Grid} from '@mui/material/';
import { IBook } from '../../interfaces';
import styles from './index.module.scss'
import { dateConvertor } from '../../utils';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface BookPreviewItemPropss {
   book: IBook;
}

export const BookPreviewItem = ({ book }: BookPreviewItemPropss) => {
   const { author, title, description, createdAt, saler, type, tags, price } = book;
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
               <Typography >
                  {title}
               </Typography>
               <Typography  color="text.secondary">
                  {description}
               </Typography>
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
               <Typography component="span">
                  <strong>Price: </strong>{price}$;
               </Typography>
            </CardContent>
         </Card>
      </Grid>
   )
};

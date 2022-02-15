import React from 'react';
import { selectUser, createBookAnnouncementAsyncAction } from '../../store/features';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Grid, Button, Select, InputLabel, MenuItem, FormControl } from '@mui/material/';
import styles from './index.module.scss'
import { CustomInput } from '../../components';
import { useForm } from 'react-hook-form';
import { BookTypesEnum } from '../../interfaces';

interface CreateAnnouncementFormState {
   author: string;
   title: string;
   description: string;
   type: BookTypesEnum;
   tags: string[];
   price: number;
}

export const genreArr = [
   'Action and adventure',
   'Alternate history',
   'Anthology',
   'Chick lit',
   'Children`s',
   'Classic',
   'Comicbook',
   'Coming-of-age',
   'Crime',
   'Dramae',
   'Fantasy',
   'Graphic novel',
   'Historical fiction',
   'Horror',
   'Mystery',
   'Paranormal romance',
   'Picture book',
   'Poetry',
   'Political thriller',
   'Romance',
   'Satire',
   'Science fiction',
   'Short story',
   'Suspense',
   'Thriller',
   'Western',
   'Young adult',
   'Art/architecture',
   'Autobiography',
   'Biography',
   'Business/economics',
   'Crafts/hobbies',
   'Cookbook',
   'Diary',
   'Dictionary',
   'Encyclopedia',
   'Health/fitness',
   'History',
   'Home and garden',
   'Humor',
   'Journal',
   'Math',
   'Memoir',
   'Philosophy',
   'Prayer',
   'Religion, spirituality, and new age',
   'Textbook',
   'True crime',
   'Review',
   'Science',
   'Self help',
   'Sports and leisure',
   'Travel',
   'Guide',
]


export const CreateAnnouncementForm = () => {
   const { userData } = useAppSelector(selectUser);
   const dispatch = useAppDispatch();
   const { register, handleSubmit, formState, reset } = useForm<CreateAnnouncementFormState>();
   
   const onSubmit = (formData: CreateAnnouncementFormState) => {
      const { author, title, description, type, tags, price } = formData;
      console.log('formData', formData, userData?.id)
      
      dispatch(createBookAnnouncementAsyncAction({
         saler: userData?.id,
         author,
         title, 
         description,
         type, 
         tags, 
         price
      }))
      reset();
   }
   return (
      <div className={styles.formCard}>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
               <Grid item xs={6} md={6}>
                  <CustomInput
                     className={styles.formItem}
                     label="Book Author"
                     {...register('author', { required: { value: true, message: 'Enter book author'}, minLength: 6, maxLength: 32})} 
                     error={formState.errors.author}
                  />
               </Grid>
               <Grid item xs={6} md={6}>
                  <CustomInput
                     className={styles.formItem}
                     label="Book title"
                     {...register('title', { required: { value: true, message: 'Enter book title'}, minLength: 6})} 
                     error={formState.errors.title}
                  />
               </Grid>
               <Grid item xs={12} md={12}>
                  <CustomInput
                     className={styles.formItem}
                     label="Book description"
                     {...register('description', { required: { value: true, message: 'Enter book description'}, minLength: 6})} 
                     error={formState.errors.description}
                  />
               </Grid>
               <Grid item xs={3} md={3}>
                  <FormControl className={styles.formItem}>
                     <InputLabel id="demo-multiple-name-label">Book type</InputLabel>
                     <Select
                        defaultValue={''}
                        {...register("type", )}
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        autoWidth
                        label="Book type"
                     >
                        <MenuItem value={'Fiction'}>Fiction</MenuItem>
                        <MenuItem value={'NonFiction'}>Non fiction</MenuItem>
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item xs={3} md={3}>
                  <FormControl className={styles.formItem}>
                     <InputLabel id="demo-multiple-name-label">Tags</InputLabel>
                     <Select
                        {...register("tags")}
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        autoWidth
                        label="Fiction"
                        defaultValue={''}
                     >
                        <MenuItem value="">
                           <em>None</em>
                        </MenuItem>
                        {genreArr.map((name: string) => (
                           <MenuItem
                              key={name}
                              value={name}
                           >
                           {name}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item xs={3} md={3}>
                  <CustomInput
                     type='number'
                     className={styles.formItem}
                     label="Price"
                     {...register('price', { required: { value: true, message: 'Enter book price'}})} 
                     error={formState.errors.price}
                  />
               </Grid>
               <Grid item xs={3} md={3}>
                  <Button variant="contained" color="primary" type="submit" className={styles.formBtn}>
                     Create announcement
                  </Button>
               </Grid>          
            </Grid>
         </form>
      </div>
   )
}

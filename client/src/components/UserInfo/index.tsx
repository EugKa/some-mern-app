import React from 'react';
import { Card, CardContent, Typography } from '@mui/material/';
import { selectUser } from '../../store/features/user/userSlice';
import { useAppSelector } from '../../store/hooks';
import { selectPosts } from '../../store/features/posts/postsSlice';

export const UserInfo = () => {
   const { userData } = useAppSelector(selectUser);
   const { userPosts } = useAppSelector(selectPosts);
   return (
      <Card>
         <CardContent>
            <Typography variant="body2">
               User name: {userData?.userName}
            </Typography>
            <Typography variant="body2">
               Email: {userData?.email}
            </Typography>
            <Typography variant="body2">
               Account: {userData?.isActivated ? "Activated" : "Please check your email"}
            </Typography>
            <Typography variant="body2">
               Posts count: {userPosts.length}
            </Typography>
            old title1 old description1
         </CardContent>
      </Card>
   );
};

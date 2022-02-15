import React from 'react';
import { Card, CardContent, Typography } from '@mui/material/';
import { useAppSelector } from '../../store/hooks';
import { selectbookAnnouncements, selectUser } from '../../store/features';

export const UserInfo = () => {
   const { userData } = useAppSelector(selectUser);
   const { userBookAnnouncements } = useAppSelector(selectbookAnnouncements);
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
               Posts count: {userBookAnnouncements.length}
            </Typography>
            old title1 old description1
         </CardContent>
      </Card>
   );
};

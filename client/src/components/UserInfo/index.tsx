import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material/';
import { selectUser } from '../../store/features/user/userSlice';
import { useAppSelector } from '../../store/hooks';

export const UserInfo = () => {
   const user = useAppSelector(selectUser);
   const { userData } = user;
   return <Card>
   <CardContent>
      <Typography variant="body2">
         User name: {userData.userName}
      </Typography>
      <Typography variant="body2">
         Email: {userData.email}
      </Typography>
      <Typography variant="body2">
         Posts count: 1
      </Typography>
   </CardContent>
   <CardActions>
   <Button size="small">Learn More</Button>
   </CardActions>
   </Card>;
};

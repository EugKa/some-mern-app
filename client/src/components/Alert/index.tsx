import React, { useState } from 'react';
import {Alert, AlertTitle, Collapse, Box, Button, IconButton, Stack, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface MyAllertProps {
   severity: 'error' | 'warning' | 'info' |'success';
   children: React.ReactNode | unknown
}

export const MyAllert = ({ severity, children }: MyAllertProps) => {
   return (
      <Stack spacing={2} sx={{ width: '100%' }}>
         <Alert severity="error"><strong>{severity.toLocaleUpperCase()}</strong> — {children}</Alert>
      </Stack>
   )
};
   

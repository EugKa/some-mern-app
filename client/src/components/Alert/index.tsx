import React from 'react';
import {Alert, Collapse, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../store/hooks';
import { changeError } from '../../store/features/user/userSlice';

interface MyAllertProps {
  severity: 'error' | 'warning' | 'info' |'success';
  children: React.ReactNode | unknown;
  open?: boolean;
}

export const MyAllert = ({ severity, children, open }: MyAllertProps) => {
   const dispatch = useAppDispatch();
   return (
      <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
         <Alert action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
               dispatch(changeError(null))
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }} severity={severity}><strong>{severity.toLocaleUpperCase()}</strong> — {children}</Alert>
      </Collapse>
    </Box>
  );
}

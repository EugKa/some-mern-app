import React from 'react';

import { Toolbar, AppBar, Button, Container} from '@mui/material';
import { LinksBar, UserBar, SearchBar } from './components'

import { useAppSelector } from '../../store/hooks';
import {  selectUser } from '../../store/features';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { isAuth } = useAppSelector(selectUser);
  let navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LinksBar/>
          <SearchBar/>
          {isAuth ? (
              <UserBar/>
            ) : (
              <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  onClick={() => navigate('/account/login')}
                >
                  Login
              </Button>
            )
          }   
        </Toolbar>
      </Container>
    </AppBar>
  );
};


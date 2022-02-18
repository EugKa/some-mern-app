import React from 'react'
import { Menu, MenuItem, Typography, IconButton, Box, Tooltip } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { logoutAsyncAction } from '../../../../store/features/user/userSlice';
import { useAppDispatch } from '../../../../store/hooks';

export const UserBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
      <Box sx={{ flexGrow: 0 }}>
         <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <AccountCircle />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">
                Profile
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(logoutAsyncAction())}>
              <Typography textAlign="center">
                Logout
              </Typography>
            </MenuItem>
        </Menu>
      </Box>
  )
}

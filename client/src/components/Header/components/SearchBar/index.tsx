import React, { KeyboardEvent } from 'react';
import { InputBase, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useInput } from '../../../hooks';
import { useAppDispatch } from '../../../../store/hooks';
import { getAllBookAnnouncementsAsyncAction, searchBookAnnouncementsAsyncAction } from '../../../../store/features';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
   position: 'relative',
   borderRadius: theme.shape.borderRadius,
   backgroundColor: alpha(theme.palette.common.white, 0.15),
   '&:hover': {
     backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   marginRight: theme.spacing(2),
   marginLeft: 0,
   width: '100%',
   [theme.breakpoints.up('sm')]: {
     marginLeft: theme.spacing(3),
     width: 'auto',
   },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const SearchBar = React.memo(() => {
  const disptach = useAppDispatch()
  const searchInput = useInput<string>('');
  let navigate = useNavigate();

  console.log('searchInput', searchInput)

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log('press', searchInput.value);
      if(searchInput.value === ''){
        disptach(getAllBookAnnouncementsAsyncAction())
      } else {
        disptach(searchBookAnnouncementsAsyncAction(searchInput.value))
        navigate('/')

      }
    }
  }

  const handleSubmit = () => {
    console.log('submit',searchInput.value);
    if(searchInput.value === ''){
      disptach(getAllBookAnnouncementsAsyncAction())
    } else {
      disptach(searchBookAnnouncementsAsyncAction(searchInput.value))
      navigate('/')
    }
  }

  return (
     <Search>

        <StyledInputBase
          placeholder="Search by all books"
          inputProps={{ 'aria-label': 'search' }}
          {...searchInput}
          onKeyPress={handleKeyPress}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={handleSubmit}>
          <SearchIcon />
        </IconButton>
     </Search>
  )
})

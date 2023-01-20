import './rootLayout.css';

import { Heading, Spacer, Box } from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

import { extendTheme } from '@chakra-ui/react';
import { myTheme } from '../styles/theme';

export default function RootLayout() {
  console.log(myTheme);
  return (
    <Box className='root-layouts'>
      <Box as='header'>
        <Box as='nav' display='flex' alignItems='center'>
          <Heading as='h1'>Boxer-Connect</Heading>
          <Spacer />
          <Box as='div' className='nav-menu' display='flex' gap='5px'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='signup'>SignUp</NavLink>
            <NavLink to='login'>Login</NavLink>
            <NavLink to='/help'>Help</NavLink>
            <NavLink to='/about'>About</NavLink>
          </Box>
        </Box>
        <Breadcrumbs />
      </Box>

      <main>
        <Outlet />
      </main>
    </Box>
  );
}

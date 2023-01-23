import {
  Heading,
  Box,
  Button,
  VStack,
  HStack,
  Spacer,
  CSSReset,
} from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';
import LoginDraw from '../components/LoginComponent';

const RootLayout = () => {
  return (
    <>
      <CSSReset />
      <Box className='root-layouts' h='95vh'>
        <VStack as='header' bg='primary'>
          <HStack className='logo' w='100vw' justifyContent='space-between'>
            <Heading
              as='h1'
              ml='20px'
              h='max-content'
              color='brand.400'
              p='10px'>
              Boxer-Connect
            </Heading>

            <Box as='nav'>
              <HStack className='nav-menu' mr='20px'>
                <LoginDraw />
                <NavLink to='/'>Home</NavLink>
              </HStack>
            </Box>
          </HStack>
        </VStack>
      </Box>
      <Box as='main'>
        <Outlet />
      </Box>
      <Box>
        <HStack as='footer' bg='primary' w='100vw' justifyContent='center'>
          <Heading as='h3' color='brand.400'>
            Footer
          </Heading>
        </HStack>
      </Box>
    </>
  );
};

export default RootLayout;

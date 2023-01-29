import {
  Heading,
  Box,
  Button,
  VStack,
  HStack,
  Spacer,
  CSSReset,
  Image,
} from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../components/homeComponents/Footer';
import LoginDraw from '../components/homeComponents/LoginComponent';

const RootLayout = () => {
  return (
    <>
      <CSSReset />
      <Box className='root-layouts' h='100hv'>
        <VStack as='header' bg='primary'>
          <HStack className='logo' w='100vw' justifyContent='space-around'>
            <Heading
              fontSize='5xl'
              as='h1'
              ml='20px'
              h='max-content'
              color='brand.400'
              p='10px'>
              <Image
                src='./src/assets/logo-no-background.svg'
                alt='boxer-connect logo'
                h='4rem'
                m='0.5rem'
              />
            </Heading>

            <Box as='nav'>
              <HStack className='nav-menu' mr='30px' gap='10px'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='about'>About</NavLink>
                <NavLink to='contact'>Contact</NavLink>
                <LoginDraw />
              </HStack>
            </Box>
          </HStack>
        </VStack>
      </Box>
      {/* Breadcrumb */}
      <Box as='main'>
        <Outlet />
      </Box>
      <Box>
        <HStack as='footer' bg='primary' w='100vw'>
          <Footer />
        </HStack>
      </Box>
    </>
  );
};

export default RootLayout;

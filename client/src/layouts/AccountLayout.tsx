import {
  CSSReset,
  VStack,
  HStack,
  Heading,
  Box,
  Image,
  Button,
} from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/homeComponents/Footer';

import { logout } from '../hooks/useAPIFeatures';

import { useRecoilValue, useRecoilState } from 'recoil';
import { userAuthState } from '../state/recoil_state';

export default function AccountLayout() {
  const userAuth = useRecoilValue(userAuthState);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    //todo: temporary fix for logout and redirect to home page
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

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
                h='4rem'
                m='0.5rem'
                src='./src/assets/logo-no-background.svg'
                alt='boxer-connect logo'
              />
            </Heading>

            <Box as='nav'>
              <HStack className='nav-menu' mr='30px' gap='10px'>
                {/*//! Global Auth need sorting  */}
                {/* {console.log(userAuth.user)} */}
                {userAuth.user && (
                  <Heading
                    fontSize='2xl'
                    as='h2'
                    color='brand.500'
                    p='10px'
                    mr='20px'>
                    Welcome {userAuth && userAuth.user.firstName}
                  </Heading>
                )}
                {/* <NavLink to='/'>Home</NavLink>
                <NavLink to='about'>About</NavLink>
                <NavLink to='contact'>Contact</NavLink> */}
                <Button
                  leftIcon={<LockIcon />}
                  bg='brand.400'
                  color='secondary'
                  _hover={{ bg: 'brand.brand.600', color: 'brand.50' }}
                  onClick={() => {
                    handleLogout();
                  }}>
                  Logout
                </Button>
              </HStack>
            </Box>
          </HStack>
        </VStack>
      </Box>

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
}

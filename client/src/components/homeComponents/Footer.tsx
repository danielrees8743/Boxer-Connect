import {
  Box,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  HStack,
  VStack,
} from '@chakra-ui/react';
import {} from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Box
      as='footer'
      bg='primary'
      w='100%'
      border='1px solid red'
      display='flex'
      alignItems='center'
      justifyContent='space-evenly'>
      <Box className='img-container' h='100px'>
        <Image
          src='./src/assets/logo-no-background.svg'
          alt='Boxer'
          mr='10px'
          h='4rem'
        />
      </Box>
      <Box my={10}>
        <HStack>
          <VStack mr='3rem' className='footer-links'>
            <Heading as='h3' size='md'>
              <NavLink to='about'>About</NavLink>
            </Heading>
            <List color='brand.400' spacing={4} textAlign='center'>
              <ListItem>Our Story</ListItem>
              <ListItem>Our Team</ListItem>
              <ListItem>Our Mission</ListItem>
            </List>
          </VStack>
          <VStack className='footer-links'>
            <Heading as='h3' size='md'>
              <NavLink to='contact'>Contact</NavLink>
            </Heading>
            <List color='brand.400' spacing={4} textAlign='center'>
              <ListItem>Our Story</ListItem>
              <ListItem>Our Team</ListItem>
              <ListItem>Our Mission</ListItem>
            </List>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}

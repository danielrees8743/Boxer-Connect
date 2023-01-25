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
    <Box as='footer' bg='secondary'>
      <SimpleGrid
        columns={2}
        spacing={5}
        w='100vw'
        alignItems='center'
        justifyItems='center'>
        <Box h='100px'>
          <Image src='./src/assets/Logo.png' alt='Boxer' ml='15px' h='5rem' />
        </Box>
        <Box>
          <HStack>
            <VStack mr={10}>
              <Heading as='h3' size='md'>
                <NavLink to='about'>About</NavLink>
              </Heading>
              <List color='brand.400' spacing={4} textAlign='center'>
                <ListItem>Our Story</ListItem>
                <ListItem>Our Team</ListItem>
                <ListItem>Our Mission</ListItem>
              </List>
            </VStack>
            <VStack>
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
      </SimpleGrid>
    </Box>
  );
}

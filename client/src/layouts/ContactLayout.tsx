import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Textarea,
  Heading,
  Text,
} from '@chakra-ui/react';

import { EmailIcon } from '@chakra-ui/icons';

export default function ContactLayout() {
  return (
    <>
      <Heading textAlign='center' mt='15px'>
        Contact
      </Heading>
      <Text textAlign='center'>
        If you have any questions, feedback or suggestion for new features then
        please feel free to contact me.
      </Text>

      <Box
        my='20px'
        className='form-contact'
        display='flex'
        justifyContent='center'>
        <FormControl
          isRequired
          maxW='500px'
          border='3px solid lightBlue'
          borderRadius='10px'
          shadow='dark-lg'
          p='10px'>
          <FormLabel m='5px'>Name</FormLabel>
          <Input placeholder='Name' isRequired />
          <FormErrorMessage>Name is required.</FormErrorMessage>
          <FormLabel m='5px'>Email</FormLabel>
          <Input placeholder='Email' isRequired />
          <FormErrorMessage>Email is required.</FormErrorMessage>
          <FormLabel m='5px'>Message or feedback</FormLabel>
          <Textarea placeholder='Message' isRequired mb='5' />
          <FormErrorMessage>Message is required.</FormErrorMessage>
          <Button
            bg='brand.400'
            color='secondary'
            _hover={{ bg: 'brand.600', color: 'brand.50' }}>
            <EmailIcon
              color='tertiary'
              mr='10px'
              // _hover={{ bg: 'brand.600', color: 'brand.50' }}
            />
            Send
          </Button>
        </FormControl>
      </Box>
    </>
  );
}

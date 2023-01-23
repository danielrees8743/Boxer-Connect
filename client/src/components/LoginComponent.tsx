import { useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';
import { fetchClubs } from '../hooks/useAPIFeatures';

interface Club {
  _id: number;
  name: string;
}

function LoginDraw() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const { data, isLoading, isError } = useQuery(['clubs'], fetchClubs);

  return (
    <>
      <Button
        leftIcon={<UnlockIcon />}
        bg='brand.400'
        color='secondary'
        _hover={{ bg: 'brand.600', color: 'brand.50' }}
        onClick={onOpen}>
        Login
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Login</DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormLabel htmlFor='username'>Email</FormLabel>
                <Input
                  ref={firstField}
                  id='email'
                  placeholder='Please enter your email'
                />
              </Box>

              <Box>
                <FormLabel htmlFor='owner'>Select Club</FormLabel>
                {isLoading && <p>Loading...</p>}
                <Select id='club' defaultValue='Club'>
                  <option>Select Club</option>
                  {data?.data.map((club: Club) => (
                    <option key={club._id} value={club._id}>
                      {club.name}
                    </option>
                  ))}
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor='username'>Password</FormLabel>
                <Input
                  type='password'
                  ref={firstField}
                  id='password'
                  placeholder='Please enter your password'
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              bg='brand.400'
              color='secondary'
              _hover={{ bg: 'brand.600', color: 'brand.50' }}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default LoginDraw;

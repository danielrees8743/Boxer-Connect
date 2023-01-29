import { Box, Heading, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../../hooks/useAPIFeatures';

import { useRecoilValue } from 'recoil';
import { userAuthState } from '../../state/recoil_state';

export default function Profile() {
  const userAuth = useRecoilValue(userAuthState);

  console.log(userAuth.user);

  return (
    <Box as='section'>
      <Heading as='h1'>Profile</Heading>
      <Heading as='h3' fontSize='18px' color='brand.400'>
        First Name : {userAuth && userAuth.user.firstName}
      </Heading>
      <Heading as='h3' fontSize='18px' color='brand.400'>
        Surname : {userAuth && userAuth.user.lastName}
      </Heading>
      <Heading as='h3' fontSize='18px' color='brand.400'>
        Club Role : {userAuth && userAuth.user.role}
      </Heading>
      <Heading as='h3' fontSize='18px' color='brand.400'>
        Contact Number : {userAuth && userAuth.user?.contactNumber}
      </Heading>
      <Heading as='h3' fontSize='18px' color='brand.400'>
        Club Name : {userAuth && userAuth.user.club.name}
      </Heading>
      <Heading as='h3' fontSize='18px' color='brand.400'>
        Club Division : {userAuth && userAuth.user.club.division}
      </Heading>
      <Heading as='h3' fontSize='18px' color='brand.400'>
        WBA ID : {userAuth && userAuth.user.club.clubId}
      </Heading>
      <Heading as='h3' fontSize='18px' color='brand.400'>
        CLub Email : {userAuth && userAuth.user.club.email}
      </Heading>
    </Box>
  );
}

import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { response } from 'express';
import { CLOSING } from 'ws';
import { fetchProfile } from '../../hooks/useAPIFeatures';

const fetchProfilePicture = async (key: string) => {
  console.log(key);
  const response = await axios.get(
    `http://localhost:8001/api/boxers/profilePic/${key}`
  );

  return response.data;
};

export default function Profile(key: string) {
  // const { data, isError, isLoading } = useQuery({
  //   queryKey: ['profileImage', key],
  //   queryFn: () => fetchProfilePicture('796f975fd599a5c190fe760866f44d19'),
  // });

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error!</p>;

  // console.log(data);

  return (
    <Box as='section'>
      <Heading as='h1' size='xl'>
        Boxers
      </Heading>
      {/* {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error!</p>
      ) : ( */}
      <Image
        // src='profilePic/796f975fd599a5c190fe760866f44d19'
        fallbackSrc='https://via.placeholder.com/150'
        alt='Profile Picture'
      />
      {/* )} */}
      {/* <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis aut
        <Image
          // src=
          fallbackSrc='https://via.placeholder.com/150'
        />
      </Text> */}
    </Box>
  );
}

import { Outlet } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';

export default function AboutLayout() {
  return (
    <Box>
      <Heading>This is the About Page</Heading>
      <Outlet />
    </Box>
  );
}

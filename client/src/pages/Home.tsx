import { Box, Image, VStack, HStack, Grid, GridItem } from '@chakra-ui/react';

import Carousel from '../components/Carousel';

export default function Home() {
  return (
    <Box as='section'>
      <HStack
        className='hero'
        border='1px solid red'
        // boxSize='lg'
        p={2}
        bg='secondary'
        justifyContent='center'>
        <Carousel />
      </HStack>
      <Box border='1px solid yellow' bg='secondary'>
        Motivation
        <Grid
          h='300px'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(3, 1fr)'
          gap={4}>
          <GridItem rowSpan={3} colSpan={1} bg='brand.800'>
            Grid Item 1
          </GridItem>
          <GridItem colSpan={2} bg='brand.800'>
            Grid Item 2
          </GridItem>
          <GridItem colSpan={2} bg='brand.800'>
            Grid Item 3
          </GridItem>
        </Grid>
      </Box>
      <Box border='1px solid green' mt='25px'>
        <VStack>
          <Box bg='secondary'>Features</Box>
        </VStack>
      </Box>
    </Box>
  );
}

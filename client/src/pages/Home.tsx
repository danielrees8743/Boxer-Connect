import { Box, VStack, HStack, Grid, GridItem } from '@chakra-ui/react';

import Carousel from '../components/homeComponents/Carousel';
import Motivation from '../components/homeComponents/Motivation';
import Features from '../components/homeComponents/Features';

export default function Home() {
  return (
    <Box as='main'>
      <HStack className='hero' bg='secondary' justifyContent='center'>
        //fix: Uncomment out Carousel component
        {/* <Carousel /> */}
      </HStack>
      <VStack className='features' bg='secondary' mt='10px'>
        <Features />
      </VStack>
      <Box bg='secondary'>
        <Grid
          templateColumns='repeat(3, 1fr)'
          gap={4}
          placeItems='center'
          my='10px'
          border='1px solid cyan'>
          <GridItem colSpan={1} bg='secondary'>
            <Motivation />
          </GridItem>
          <GridItem colSpan={1} bg='secondary'>
            <Motivation />
          </GridItem>
          <GridItem colSpan={1} bg='secondary'>
            <Motivation />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}

import { Box, VStack, HStack, Grid, GridItem } from '@chakra-ui/react';

import Carousel from '../components/homeComponents/Carousel';
import Motivation from '../components/homeComponents/Motivation';

export default function Home() {
  return (
    <Box as='section'>
      <HStack className='hero' bg='secondary' justifyContent='center'>
        //fix: Uncomment out Carousel component
        {/* <Carousel /> */}
      </HStack>
      <Box border='1px solid green' mt='25px'>
        <VStack>
          <Box bg='secondary' mx='10px'>
            Features
          </Box>
        </VStack>
      </Box>
      <Box bg='secondary'>
        <Grid
          templateColumns='repeat(3, 1fr)'
          gap={4}
          placeItems='center'
          my='10px'>
          <GridItem colSpan={1} bg='brand.800'>
            <Motivation />
          </GridItem>
          <GridItem colSpan={1} bg='brand.800'>
            <Motivation />
          </GridItem>
          <GridItem colSpan={1} bg='brand.800'>
            <Motivation />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}

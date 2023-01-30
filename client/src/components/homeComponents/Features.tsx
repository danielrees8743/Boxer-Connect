import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
} from '@chakra-ui/react';
import { Search2Icon, ChatIcon, EmailIcon, CheckIcon } from '@chakra-ui/icons';

export default function Features() {
  return (
    <Box
      as='section'
      minWidth='320px'
      w='100%'
      // border='1px solid green'
      className='Feature-component'>
      <Heading as='h2' textAlign='center' mt='10px' fontSize='6xl'>
        Features
      </Heading>
      <Box
        className='feat-container'
        display='flex'
        flexDir='column'
        alignItems='center'
        justifyContent='center'>
        <Box
          className='search'
          my='15px'
          ml='15%'
          mr='auto'
          // border='1px solid pink'
          shadow='dark-lg'
          maxW='30%'>
          <Card className='search-card'>
            <CardHeader fontSize='3xl'>Search</CardHeader>
            <CardBody>
              <List spacing={4}>
                <ListItem listStyleType='none'>
                  <ListIcon as={Search2Icon} color='brand.400' h={6} w={6} />
                  <Text display='inline' ml='15px'>
                    Search for fights for your boxers, searches are done for you
                    automatically.
                  </Text>
                </ListItem>
                <ListItem listStyleType='none'>
                  <ListIcon as={CheckIcon} color='brand.400' h={6} w={6} />
                  <Text display='inline' ml='15px'>
                    Avoid on the night disappointment's. Update boxers weights
                    regularly. This keeps the search results accurate.
                  </Text>
                </ListItem>
                <ListItem listStyleType='none'>
                  <ListIcon as={CheckIcon} color='brand.400' h={6} w={6} />
                  <Text display='inline' ml='15px'>
                    Search results are based on the WBA rules and regulations
                    for Amateur Boxers, Weight within 2kg of the boxer's weight
                    class. Age within 1 year of the boxer's age and bouts are
                    within 5 fights of you boxers' bouts.
                  </Text>
                </ListItem>
              </List>
            </CardBody>
            <CardFooter>
              <Button bg='brand.400' color='secondary'>
                More Info
              </Button>
            </CardFooter>
          </Card>
        </Box>
        <Box
          className='message'
          ml='auto'
          my='15px'
          // border='1px solid yellowgreen'
          shadow='dark-lg'
          mr='15%'
          maxW='30%'>
          <Card className='message-card'>
            <CardHeader fontSize='3xl'>Message</CardHeader>
            <CardBody>
              <List spacing={4}>
                <ListItem listStyleType='none'>
                  <ListIcon as={ChatIcon} color='brand.400' h={6} w={6} />
                  <Text display='inline' ml='15px'>
                    Search for fights for your boxers, searches are done for you
                    automatically.
                  </Text>
                </ListItem>
                <ListItem listStyleType='none'>
                  <ListIcon as={CheckIcon} color='brand.400' h={6} w={6} />
                  <Text display='inline' ml='15px'>
                    Avoid on the night disappointment's. Update boxers wights
                    regularly. This keeps the search results accurate.
                  </Text>
                </ListItem>
                <ListItem listStyleType='none'>
                  <ListIcon as={CheckIcon} color='brand.400' h={6} w={6} />
                  <Text display='inline' ml='15px'>
                    Search results are based on the WBA rules and regulations
                    for Amateur Boxers, Weight within 2kg of the boxer's weight
                    class. Age within 1 year of the boxer's age and bouts are
                    within 5 fights of you boxers' bouts.
                  </Text>
                </ListItem>
              </List>
            </CardBody>
            <CardFooter>
              <Button bg='brand.400' color='secondary'>
                More Info
              </Button>
            </CardFooter>
          </Card>
        </Box>
        <Box
          className='email'
          my='15px'
          mr='auto'
          ml='15%'
          // border='1px solid cyan'
          shadow='dark-lg'
          maxW='30%'
          mb='30px'>
          <Card className='email-card'>
            <CardHeader fontSize='3xl'>Email</CardHeader>
            <CardBody>
              <List spacing={4}>
                <ListItem listStyleType='none'>
                  <ListIcon as={ChatIcon} color='brand.400' h={6} w={6} />
                  <Text display='inline' ml='15px'>
                    Search for fights for your boxers, searches are done for you
                    automatically.
                  </Text>
                </ListItem>
                <ListItem listStyleType='none'>
                  <ListIcon as={CheckIcon} color='brand.400' h={6} w={6} />
                  <Text display='inline' ml='15px'>
                    Avoid on the night disappointment's. Update boxers wights
                    regularly. This keeps the search results accurate.
                  </Text>
                </ListItem>
                <ListItem listStyleType='none'>
                  <ListIcon as={CheckIcon} color='brand.400' h={6} w={6} />
                  <Text display='inline' ml='15px'>
                    Search results are based on the WBA rules and regulations
                    for Amateur Boxers, Weight within 2kg of the boxer's weight
                    class. Age within 1 year of the boxer's age and bouts are
                    within 5 fights of you boxers' bouts.
                  </Text>
                </ListItem>
              </List>
            </CardBody>
            <CardFooter>
              <Button bg='brand.400' color='secondary'>
                More Info
              </Button>
            </CardFooter>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

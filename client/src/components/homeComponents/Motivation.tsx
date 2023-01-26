import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Box,
  Divider,
} from '@chakra-ui/react';

export default function Motivation() {
  return (
    <Box h='max-content' bg='secondary'>
      <Card w={300} border='1px solid gray.500'>
        <CardHeader>Motivation</CardHeader>
        <CardBody>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            aut molestias doloribus dignissimos optio ipsa facilis inventore
            mollitia, corrupti, labore consequuntur! Ex sapiente sint explicabo
            incidunt officia expedita at tempora!
          </Text>
        </CardBody>
        <Divider />
        <CardFooter>Footer</CardFooter>
      </Card>
    </Box>
  );
}

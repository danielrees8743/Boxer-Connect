import { Flex } from '@chakra-ui/react';
import { useLocation, Link } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();

  let currentLink = '';
  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;
      return (
        <div className='crumb' key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </div>
      );
    });
  return (
    <Flex
      flexDir='row'
      gap='10px'
      justifyContent='center'
      mb='5px'
      className='breadcrumbs'>
      {crumbs}
    </Flex>
  );
}

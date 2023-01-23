import { Box } from '@chakra-ui/react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

//* Layouts
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(<Route path='/' element={<RootLayout />} />)
);

function App() {
  return (
    <Box className='App' bg='tertiary'>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;

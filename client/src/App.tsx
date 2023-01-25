import { Box } from '@chakra-ui/react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

//* Layouts
import RootLayout from './layouts/RootLayout';
import AboutLayout from './layouts/AboutLayout';
import ContactLayout from './layouts/ContactLayout';

//* Pages
import Home from './pages/Home';
import Faq from './pages/Faq';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<AboutLayout />}>
        <Route path='faq' element={<Faq />} />
      </Route>

      <Route path='contact' element={<ContactLayout />}>
        <Route path='faq' element={<Faq />} />
      </Route>

      <Route path='*' element={<h1>404</h1>} />
    </Route>
  )
);

function App() {
  return (
    <Box className='App' bg='tertiary'>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;

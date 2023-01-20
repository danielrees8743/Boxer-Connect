import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

//? Pages
import Home from './pages/Home';
import RootLayout from './layouts/RootLayout';
import NotFound from './pages/NotFound';
import AboutLayout from './layouts/AboutLayout';
import Faq from './pages/help/Faq';
import Contact from './pages/help/Contact';
import HelpLayout from './layouts/HelpLayout';
import Motivation from './pages/about/Motivation';
import Reason from './pages/about/Reason';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/protected/Account';
import { Box, Container } from '@chakra-ui/react';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
      <Route path='about' element={<AboutLayout />} />
      <Route path='account' element={<Account />} />

      <Route path='about' element={<AboutLayout />}>
        <Route path='motivation' element={<Motivation />} />
        <Route path='reason' element={<Reason />} />
      </Route>

      <Route path='help' element={<HelpLayout />}>
        <Route path='contact' element={<Contact />} />
        <Route path='faq' element={<Faq />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return (
    <Box className='App' h='100vh' m='25px'>
      <RouterProvider router={router} />
    </Box>
  );
}

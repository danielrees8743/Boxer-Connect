import { Box } from '@chakra-ui/react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  redirect,
} from 'react-router-dom';

//* Layouts
import RootLayout from './layouts/RootLayout';
import AboutLayout from './layouts/AboutLayout';
import ContactLayout from './layouts/ContactLayout';
import AccountLayout from './layouts/AccountLayout';

//* Pages
import Home from './pages/Home';
import Faq from './pages/Faq';
import AccountHome from './pages/accountPages/AccountHome';

//* State
import { useRecoilValue } from 'recoil';
import { userAuthState } from './state/recoil_state';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
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

      <Route path='/account' element={<AccountLayout />}>
        <Route index element={<AccountHome />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <Box className='App' bg='tertiary' w='100%'>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;

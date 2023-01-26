import { Box } from '@chakra-ui/react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  // Redirect,
} from 'react-router-dom';

//* Layouts
import RootLayout from './layouts/RootLayout';
import AboutLayout from './layouts/AboutLayout';
import ContactLayout from './layouts/ContactLayout';
import AccountLayout from './layouts/AccountLayout';

//* Pages
import Home from './pages/Home';
import Faq from './pages/Faq';
import { useRecoilValue } from 'recoil';
import { AuthProvider, authState } from './state/recoil_state';
import AccountHome from './pages/accountPages/AccountHome';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const auth = useRecoilValue(authState);
//   return (
//     <Route
//       {...rest}
//       render: any={(...props: any) =>
//         auth.isAuthenticated === true ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to='/login' />
//         )
//       }
//     />
//   );
// };

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
        <Route path='' element={<AccountHome />} />
      </Route>
      {/* <PrivateRoute path='/account' component={<AccountLayout />} /> */}
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

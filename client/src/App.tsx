import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
  const queryClient = new QueryClient();

  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

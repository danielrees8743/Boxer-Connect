import './rootLayout.css';
import { NavLink, Outlet } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

export default function RootLayout() {
  return (
    <div className='root-layouts'>
      <header>
        <nav>
          <h1>Boxer Connect</h1>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='signup'>SignUp</NavLink>
          <NavLink to='login'>Login</NavLink>
          <NavLink to='/help'>Help</NavLink>
          <NavLink to='/about'>About</NavLink>
        </nav>
        <Breadcrumbs />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

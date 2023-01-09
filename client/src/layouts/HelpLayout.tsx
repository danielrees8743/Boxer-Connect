import { NavLink, Outlet } from 'react-router-dom';

export default function HelpLayout() {
  return (
    <div>
      <nav>
        <NavLink to='contact'>Contact</NavLink>
        <NavLink to='faq'>FAQ</NavLink>
      </nav>
      <h2>Help</h2>
      <Outlet />
    </div>
  );
}

import { NavLink, Outlet } from 'react-router-dom';

export default function AboutLayout() {
  return (
    <div>
      <nav>
        <NavLink to='motivation'>Motivation</NavLink>
        <NavLink to='reason'>Reason</NavLink>
      </nav>
      <p>
        This application is for fairness and to prevent disappointment for both
        boxers and trainers.
      </p>
      <Outlet />
    </div>
  );
}

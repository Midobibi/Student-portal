import { NavLink } from 'react-router-dom';

function Navbar() {
  const links = [
    ['/', 'Home'],
    ['/students', 'Students'],
    ['/courses', 'Courses'],
    ['/grades', 'Grades'],
    ['/features', 'Features'],
    ['/about', 'About'],
    ['/contact', 'Contact']
  ];

  return (
    <header className="header">
      <div className="header-inner">
        <h1>Student Portal</h1>
        <nav aria-label="Main navigation">
          {links.map(([path, label]) => (
            <NavLink key={path} to={path} end={path === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

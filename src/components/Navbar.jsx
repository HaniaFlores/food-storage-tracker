import { NavLink } from 'react-router-dom';
import { Leaf, User } from 'lucide-react';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <div className="brand-icon">
            <Leaf size={20} />
          </div>
          <div className="brand-text">
            <span>Food Storage Tracker</span>
          </div>
        </div>

        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Dashboard
          </NavLink>

          <NavLink to="/inventory" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Inventory
          </NavLink>

          <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Categories
          </NavLink>

          <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Profile
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <NavLink
            to="/profile"
            className="user-badge"
            aria-label="Profile"
            title="Profile"
          >
            <User size={18} />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
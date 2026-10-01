import { NavLink } from 'react-router-dom';
import { Leaf, Search, User } from 'lucide-react';

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

          <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Profile
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <button className="icon-button" type="button">
            <Search size={18} />
          </button>

          <div className="user-badge">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
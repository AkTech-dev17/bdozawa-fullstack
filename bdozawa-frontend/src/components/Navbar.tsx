// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Bdozawa</Link>
      
      <div className="nav-links">
        {/* These links match your required routing pages */}
        <Link to="/">Home</Link>
        <Link to="/feed">Lost & Found</Link>
        <Link to="/report">Report Item</Link>
      </div>
    </nav>
  );
};

export default Navbar;
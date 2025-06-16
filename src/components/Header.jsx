import { Link } from 'react-router-dom';
import './CSS/Header.css';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home Page</Link>
        <Link to="/events">Events</Link>
        <Link to="/about">About Us</Link>
      </div>
      <div className="profile-links">
        {user && <Link to="/profile">Profile</Link>}

        {user ? (
          <button onClick={logout} className="auth-btn logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="auth-btn">
            Login / Register
          </Link>
        )}
      </div>
    </nav>
  );
}

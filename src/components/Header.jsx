import { Link } from 'react-router-dom';
import './CSS/Header.css';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  const profileImageUrl = user?.profile_image
    ? `http://localhost:5000${user.profile_image}`
    : 'https://via.placeholder.com/35'; // fallback placeholder

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home Page</Link>
        <Link to="/events">Events</Link>

        {/* ✅ Dashboard link based on role */}
        {user && (
          <Link to={user.role === 'organizer' ? "/organizer/dashboard" : "/attendee/dashboard"}>
            Dashboard
          </Link>
        )}

        <Link to="/about">About Us</Link>
      </div>

      <div className="profile-links">
        {user && (
          <>
            <img
              src={profileImageUrl}
              alt="Profile"
              className="profile-avatar"
            />
            <Link to="/profile">Profile</Link>
          </>
        )}

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

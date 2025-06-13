import { Link } from 'react-router-dom';
import './CSS/Header.css'; // Assuming you have a CSS file for styling

export default function Header() {
  return (
    <nav className="navbar">
  <div className="nav-links">
    <Link to="/">Home Page</Link>
    <Link to="/events">Events</Link>
    <Link to="/about">About Us</Link>
  </div>
  <div className="profile-links">
    <Link to="/profile">Profile</Link>
    <Link to="/login" className="auth-btn">Login / Register</Link>
  </div>
</nav>

  );
}

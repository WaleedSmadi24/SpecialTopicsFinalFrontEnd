import { Link } from 'react-router-dom';
import './CSS/Header.css';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();

  const profileImageUrl = user?.profile_image
    ? `http://localhost:5000${user.profile_image}`
    : 'https://via.placeholder.com/35';

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=7db19be5fc594bb5af5221124251706&q=Amman`);
        const data = await res.json();
        setWeather({
          city: data.location.name,
          temp: data.current.temp_c,
          condition: data.current.condition.text,
          icon: data.current.condition.icon
        });
      } catch (err) {
        console.error('Weather fetch error:', err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home Page</Link>
        <Link to="/events">Events</Link>
        {user && (
          <Link to={user.role === 'organizer' ? "/organizer/dashboard" : "/attendee/dashboard"}>
            Dashboard
          </Link>
        )}
        <Link to="/about">About Us</Link>
      </div>

      {weather && (
        <div className="weather-widget-centered">
          <img src={weather.icon} alt={weather.condition} />
          <span>{weather.city}: {weather.temp}°C</span>
        </div>
      )}

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

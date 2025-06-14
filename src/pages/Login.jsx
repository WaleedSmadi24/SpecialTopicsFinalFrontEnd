import React, { useState } from 'react';
import './CSS/Login.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();

  const [role, setRole] = useState('attendee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password, role);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h1>Welcome to<br />Eventify</h1>
          <p>Create. Discover. Connect.</p>
        </div>

        <div className="login-card">
          <h2>Login</h2>

          <div className="role-toggle">
            <button
              className={`role-btn ${role === 'attendee' ? 'active' : ''}`}
              onClick={() => setRole('attendee')}
            >
              Attendee
            </button>
            <button
              className={`role-btn ${role === 'organizer' ? 'active' : ''}`}
              onClick={() => setRole('organizer')}
            >
              Organizer
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="forgot">
              <Link to="#">Forgot Password?</Link>
            </div>
            <button type="submit" className="login-btn">Login</button>
            {error && <p className="error-text">{error}</p>}
          </form>

          <div className="signup">
            Not a member? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import './CSS/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('attendee');

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

          <form className="login-form">
            <div className="form-group">
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="forgot">
              <Link to="#">Forgot Password?</Link>
            </div>
            <button type="submit" className="login-btn">Login</button>
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

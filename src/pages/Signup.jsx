import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/Signup.css';

const Signup = () => {
  const [role, setRole] = useState('attendee');

  return (
    <div className="signup-page">
      <div className="container">
        <div className="welcome-text">
          <h1>Welcome to<br />Eventify</h1>
          <p>Create. Discover. Connect.</p>
        </div>

        <div className="signup-container">
          <h2>Signup Form</h2>

          <div className="role-selector">
            <button
              className={`role-btn ${role === 'attendee' ? 'active' : ''}`}
              onClick={() => setRole('attendee')}
            >
              As Attendee
            </button>
            <button
              className={`role-btn ${role === 'organizer' ? 'active' : ''}`}
              onClick={() => setRole('organizer')}
            >
              As Organizer
            </button>
          </div>

          <div className="form-group">
            <input type="email" placeholder="Email Address" required />
          </div>

          <div className="form-group">
            <input type="password" placeholder="Password" required />
          </div>

          <button className="signup-btn">Signup</button>

          <div className="login-link">
            Already a Member? <Link to="/login">Login now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

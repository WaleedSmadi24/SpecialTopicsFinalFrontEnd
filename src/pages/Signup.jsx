import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/Signup.css';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { register } = useAuth();

  const [role, setRole] = useState('attendee');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const fullName = `${firstName} ${lastName}`;
      await register(fullName, email, password, role);
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

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

          <form onSubmit={handleSignup}>
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

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

            <button type="submit" className="signup-btn">Signup</button>
            {error && <p className="error-text">{error}</p>}
          </form>

          <div className="login-link">
            Already a Member? <Link to="/login">Login now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

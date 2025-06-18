import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './CSS/404NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="not-found-container">
        <div className="ghost">
          <div className="face">
            <div className="eye"></div>
            <div className="eye right"></div>
            <div className="mouth"></div>
          </div>
        </div>
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you are looking for doesn’t exist.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;

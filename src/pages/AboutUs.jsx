// --- AboutUs.jsx ---
import React from 'react';
import './CSS/AboutUs.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <>
      <Header />
      <main className="about-container">
        <section className="about-hero">
          <h1>About Eventify</h1>
          <p>Empowering connections through events and experiences.</p>
        </section>

        <section className="about-content">
          <div className="about-section">
            <h2>Who We Are</h2>
            <p>
              Eventify is a modern event management platform designed to simplify the way people create, discover, and attend events. Whether you're hosting a concert, a tech workshop, or a university expo — we provide the tools to bring your audience together.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              To bridge the gap between organizers and attendees by offering a seamless, user-friendly platform that fosters community and participation.
            </p>
          </div>

          <div className="about-section">
            <h2>Why Choose Eventify?</h2>
            <ul>
              <li>🎫 Easy ticketing and registration</li>
              <li>🔍 Discover relevant events in your area</li>
              <li>📢 Real-time updates and engagement tools</li>
              <li>📊 Powerful dashboard for organizers</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './CSS/OrganizerDB.css';

const OrganizerDashboard = () => {
  return (
    <>
    <Header />
    
    <div className="organizer-dashboard">
      <div className="create-event-section">
  <h2>Hosting a New Event?</h2>
  <Link to="/organizer/create-event" className="create-event-btn">Create an Event</Link>
</div>


      <div className="analytics-section">
        <h3>Analytics Overview</h3>
        <div className="analytics-metrics">
          <div className="metric-card">
            <span className="icon">🎟️</span>
            <h2>312</h2>
            <p>Total Tickets Sold</p>
          </div>
          <div className="metric-card">
            <span className="icon">🎟️</span>
            <h2>2.5K</h2>
            <p>Views</p>
          </div>
          <div className="metric-card">
            <span className="icon">🎟️</span>
            <h2>5</h2>
            <p>Tickets Returned</p>
          </div>
        </div>
      </div>

      <div className="latest-events">
        <h3>Latest Events</h3>
        <div className="event-cards">
          {[1, 2, 3].map((i) => (
            <div className="event-card" key={i}>
              <div className="event-image-wrapper">
                <img
                  src="https://i.imgur.com/pn9UYYN.jpeg"
                  alt="Event"
                  className="event-image"
                />
                <div className="event-date">
                  <span>JUNE</span>
                  <strong>20</strong>
                </div>
              </div>
              <div className="event-info">
                <p className="event-type">Musical Concert</p>
                <h4 className="event-title">Summer Nights V1 - ft. Taylor Swift</h4>
                <p className="event-time">08:00 PM - 10:00 PM</p>
                <button className="get-tickets-btn">View Event</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default OrganizerDashboard;

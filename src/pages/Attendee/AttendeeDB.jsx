// AttendeeDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/AttendeeDB.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const sampleEvents = [
  {
    id: 1,
    title: 'Music Concert 2025',
    date: 'July 20, 2025',
    location: 'Amman Arena',
    type: 'Concert',
    image: '/images/concert.jpg'
  },
  {
    id: 2,
    title: 'Tech Workshop: AI Basics',
    date: 'August 5, 2025',
    location: 'HTU Campus',
    type: 'Workshop',
    image: '/images/workshop.jpg'
  },
  {
    id: 3,
    title: 'Networking Night',
    date: 'September 10, 2025',
    location: 'Business Hub Cafe',
    type: 'Networking',
    image: '/images/network.jpg'
  }
];

const getBadgeClass = (type) => {
  switch(type) {
    case 'Concert': return 'badge-concert';
    case 'Workshop': return 'badge-workshop';
    case 'Networking': return 'badge-networking';
    default: return 'badge-default';
  }
};

const AttendeeDashboard = () => {
  return (
    <>
        <Header />
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome Back!</h2>

      <div className="cards-container">
        <div className="card">
          <h3>Tickets Bought</h3>
          <p>15</p>
        </div>
        <div className="card">
          <h3>Events Attended</h3>
          <p>10</p>
        </div>
        <div className="card">
          <h3>Tickets Refunded</h3>
          <p>2</p>
        </div>
      </div>

      <div className="latest-events-section">
        <h3>Latest Events Attended</h3>
        <div className="events-list">
          {sampleEvents.map(event => (
            <div key={event.id} className="event-card">
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-info">
                <span className={`event-badge ${getBadgeClass(event.type)}`}>{event.type}</span>
                <h4>{event.title}</h4>
                <p>{event.date}</p>
                <p>{event.location}</p>
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

export default AttendeeDashboard;

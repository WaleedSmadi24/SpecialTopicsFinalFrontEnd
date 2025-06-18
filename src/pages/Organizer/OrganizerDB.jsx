// --- OrganizerDB.jsx ---
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './CSS/OrganizerDB.css';
import { useAuth } from '../../context/AuthContext';

const OrganizerDashboard = () => {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      try {
        console.log('Decoded Token:', JSON.parse(atob(token.split('.')[1])));
      } catch (err) {
        console.error('Token decode failed:', err);
      }
    }
  }, [token]);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalTicketsSold: 0 });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/organizer/events`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log('🚀 Organizer events fetched from backend:', data);
        setEvents(data);
      } catch (err) {
        console.error('❌ Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/organizer/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };

    fetchEvents();
    fetchStats();
  }, [token]);

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
              <h2>{stats.totalTicketsSold}</h2>
              <p>Total Tickets Sold</p>
            </div>
            <div className="metric-card">
              <span className="icon">↩️</span>
              <h2>0</h2>
              <p>Tickets Returned</p>
            </div>
          </div>
        </div>

        <div className="latest-events">
          <h3>Latest Events</h3>
          {loading ? (
            <p>Loading events...</p>
          ) : events.length === 0 ? (
            <p>No events created yet.</p>
          ) : (
            <div className="event-cards">
              {events.map((event) => {
                const startDate = new Date(event.start_time);
                const month = startDate.toLocaleString('default', { month: 'short' }).toUpperCase();
                const day = startDate.getDate();
                return (
                  <div className="event-card" key={event.id}>
                    <div className="event-image-wrapper">
                      <img
                        src={event.image_url?.trim() ? `http://localhost:5000${event.image_url}` : 'https://i.imgur.com/pn9UYYN.jpeg'}
                        alt={event.title}
                        className="event-image"
                      />
                      <div className="event-date">
                        <span>{month}</span>
                        <strong>{day}</strong>
                      </div>
                    </div>
                    <div className="event-info">
                      <p className="event-type">{event.category_name || 'General'}</p>
                      <h4 className="event-title">{event.title}</h4>
                      <p className="event-time">
                        {new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {' - '}
                        {new Date(event.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <Link to={`/organizer/events/${event.id}`} className="get-tickets-btn">View Event</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrganizerDashboard;

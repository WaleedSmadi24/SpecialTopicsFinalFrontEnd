// --- AttendeeDB.jsx ---
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './CSS/AttendeeDB.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const getBadgeClass = (type) => {
  switch (type?.toLowerCase()) {
    case 'concert': return 'badge-concert';
    case 'workshop': return 'badge-workshop';
    case 'networking': return 'badge-networking';
    default: return 'badge-default';
  }
};

const AttendeeDashboard = () => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/tickets/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        if (Array.isArray(data)) {
          setTickets(data);
        } else {
          console.error('Expected an array but got:', data);
          setTickets([]);
        }
      } catch (err) {
        console.error('Error fetching tickets:', err);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]);

  const handleDownload = async (ticketId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tickets/${ticketId}/download`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ticket-${ticketId}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const totalSpent = tickets.reduce((sum, t) => {
    const base = t.quantity * t.unit_price;
    const tax = base * 0.15;
    return sum + base + tax;
  }, 0);

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Welcome Back!</h2>

        <div className="cards-container">
          <div className="card">
            <span className="dashboard-value">
              {tickets.reduce((sum, t) => sum + (t.quantity || 0), 0)}
            </span>
            <span className="dashboard-label">Tickets Bought</span>
          </div>
          <div className="card">
            <span className="dashboard-value">
              {[...new Set(tickets.map(t => t.event_id))].length}
            </span>
            <span className="dashboard-label">Events Attended</span>
          </div>
          <div className="card">
            <span className="dashboard-value">{totalSpent.toFixed(2)} JD</span>
            <span className="dashboard-label">Total Spent</span>
          </div>
        </div>

        <div className="latest-events-section">
          <h3>My Tickets</h3>
          {loading ? (
            <p>Loading tickets...</p>
          ) : tickets.length === 0 ? (
            <p>You haven't purchased any tickets yet.</p>
          ) : (
            <div className="events-list">
              {tickets.map(ticket => (
                <Link
                  to={`/events/${ticket.event_id}`}
                  key={ticket.ticket_id}
                  className="event-card-link"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="event-card">
                    <img
                      src={`${process.env.REACT_APP_API_URL}${ticket.image_url}`}
                      alt={ticket.event_title}
                      className="ticket-image"
                    />
                    <div className="event-info">
                      <span className={`event-badge ${getBadgeClass(ticket.event_title)}`}>
                        {ticket.event_title}
                      </span>
                      <h4>{ticket.event_title}</h4>
                      <p>{new Date(ticket.event_date).toLocaleString()}</p>
                      <p>{ticket.location}</p>
                      <p>Quantity: {ticket.quantity}</p>
                      <button
                        className="download-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDownload(ticket.ticket_id);
                        }}
                      >
                        Download Ticket (PDF)
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AttendeeDashboard;

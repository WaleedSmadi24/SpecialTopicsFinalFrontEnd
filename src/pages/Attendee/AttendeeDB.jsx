// AttendeeDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './CSS/AttendeeDB.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
      const res = await fetch('http://localhost:5000/tickets/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      // Check if response is a valid array
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
      const response = await fetch(`http://localhost:5000/tickets/${ticketId}/download`, {
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

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Welcome Back!</h2>

        <div className="cards-container">
          <div className="card">
            <h3>Tickets Bought</h3>
            <p>{tickets.length}</p>
          </div>
          <div className="card">
            <h3>Events Attended</h3>
            <p>{tickets.length}</p>
          </div>
          <div className="card">
            <h3>Tickets Refunded</h3>
            <p>0</p>
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
                <div key={ticket.ticket_id} className="event-card">
                  <img src="/images/ticket.jpg" alt={ticket.event_title} className="event-image" />
                  <div className="event-info">
                    <span className={`event-badge ${getBadgeClass(ticket.event_title)}`}>
                      {ticket.event_title}
                    </span>
                    <h4>{ticket.event_title}</h4>
                    <p>{new Date(ticket.event_date).toLocaleString()}</p>
                    <p>{ticket.location}</p>
                    <p>Quantity: {ticket.quantity}</p>
                    <button className="download-btn" onClick={() => handleDownload(ticket.ticket_id)}>
                      Download Ticket (PDF)
                    </button>
                  </div>
                </div>
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

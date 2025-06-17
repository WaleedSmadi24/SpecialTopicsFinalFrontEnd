import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './CSS/EventTicketSales.css';

const EventTicketSales = () => {
  const { eventId } = useParams();
  const { token } = useAuth();
  const [salesData, setSalesData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch(`http://localhost:5000/tickets/events/${eventId}/tickets/sales`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (res.ok) {
          setSalesData(data);
        } else {
          setError(data.message || 'Failed to load ticket sales.');
        }
      } catch (err) {
        setError('An error occurred while fetching sales.');
        console.error(err);
      }
    };

    fetchSales();
  }, [eventId, token]);

  return (
    <>
      <Header />
      <div className="ticket-sales-container">
        <h2>Ticket Sales for Event</h2>
        {error && <p className="error-message">{error}</p>}
        {!salesData ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="summary-box">
              <h3>{salesData.event_title}</h3>
              <p><strong>Total Tickets Sold:</strong> {salesData.total_tickets_sold}</p>
            </div>

            <table className="sales-table">
              <thead>
                <tr>
                  <th>Attendee Name</th>
                  <th>Email</th>
                  <th>Tickets Bought</th>
                </tr>
              </thead>
              <tbody>
                {salesData.sales.map((sale, idx) => (
                  <tr key={idx}>
                    <td>{sale.attendee_name}</td>
                    <td>{sale.email}</td>
                    <td>{sale.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EventTicketSales;

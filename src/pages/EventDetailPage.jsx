import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CSS/EventDetailPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EventDetail = () => {
  const { eventId } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState(null);
  const [quantity, setQuantity] = useState(2);
  const [showPopup, setShowPopup] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/events/${eventId}`);
        const data = await res.json();
        setEventData(data);
        setEditForm({
          title: data.title,
          description: data.description,
          location: data.location,
          start_time: data.start_time?.slice(0, 16),
          end_time: data.end_time?.slice(0, 16),
          total_tickets: data.total_tickets,
          price: data.price
        });
      } catch (err) {
        console.error('Error fetching event:', err);
      }
    };

    fetchEvent();
  }, [eventId]);

  const isOwnerOrganizer =
    user?.role === 'organizer' && user?.id === eventData?.organizer_id;

  const handleEditChange = (e) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/organizer/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      const result = await res.json();
      if (res.ok) {
        alert('Event updated.');
        setEventData(result);
        setEditing(false);
      } else {
        alert(result.message || 'Failed to update.');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Error updating event.');
    }
  };

  const ticketPrice = typeof eventData?.price === 'number' ? eventData.price : 50;
  const taxRate = 0.15;
  const subtotal = quantity * ticketPrice;
  const total = subtotal + subtotal * taxRate;

  const isPastEvent = eventData && new Date(eventData.date || eventData.start_time) < new Date();
  const ticketsLeft = eventData ? eventData.total_tickets - (eventData.tickets_sold || 0) : null;

  const handleCheckout = async () => {
    if (!user) {
      alert('You must be logged in to purchase tickets.');
      return;
    }

    if (ticketsLeft !== null && quantity > ticketsLeft) {
      alert(`Only ${ticketsLeft} ticket(s) remaining. Please reduce your quantity.`);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: user.id,
          event_id: parseInt(eventId),
          quantity
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Ticket(s) purchased successfully!');
        setShowPopup(false);
        navigate('/attendee/dashboard');
      } else {
        alert(data.message || 'Ticket purchase failed.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An error occurred while purchasing.');
    }
  };

  return (
    <>
      <Header />
      <div className="event-header">
        <div className="event-header-content">
          {eventData ? (
            <>
              <h1 className="event-title">{eventData.title}</h1>
              <p className="event-meta">{eventData.category_name || 'Event'}</p>
              <div className="event-date-time">{new Date(eventData.date || eventData.start_time).toLocaleString()}</div>
              <div className="event-location">{eventData.location}</div>

              {/* ✅ Organizer-only controls */}
              {isOwnerOrganizer && !editing && (
                <div className="organizer-tools">
                  <button onClick={() => setEditing(true)}>Edit Event</button>
                  <button onClick={() => navigate(`/organizer/events/${eventData.id}/tickets`)}>View Ticket Sales</button>
                </div>
              )}
            </>
          ) : (
            <p>Loading event details...</p>
          )}
        </div>
        {!editing && (
          <div className="ticket-qr">
            <button
              className="buy-ticket-btn"
              onClick={() => setShowPopup(true)}
              disabled={isPastEvent}
            >
              Buy Ticket Now
            </button>
          </div>
        )}
      </div>

      {editing && (
        <div className="edit-event-form">
          <h3>Edit Event</h3>
          <form onSubmit={handleEditSubmit}>
            <input name="title" value={editForm.title} onChange={handleEditChange} placeholder="Title" required />
            <textarea name="description" value={editForm.description} onChange={handleEditChange} placeholder="Description" required />
            <input name="location" value={editForm.location} onChange={handleEditChange} placeholder="Location" required />
            <input name="start_time" type="datetime-local" value={editForm.start_time} onChange={handleEditChange} required />
            <input name="end_time" type="datetime-local" value={editForm.end_time} onChange={handleEditChange} required />
            <input name="price" type="number" step="0.01" value={editForm.price} onChange={handleEditChange} required />
            <input name="total_tickets" type="number" value={editForm.total_tickets} onChange={handleEditChange} required />
            <div className="edit-buttons">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {!editing && (
        <>
          <section className="event-details-section">
            <h2 className="section-title">Event Details</h2>
            <p className="event-description">
              {eventData?.description || 'No description available.'}
            </p>
          </section>

          <section className="event-media-section">
            <h2 className="section-title">Event Photos and Videos</h2>
            <div className="video-container">
              <div className="video-placeholder" onClick={() => alert('Simulated video player')}>
                <div className="play-button" />
              </div>
              <div className="video-controls">
                <span>▶️</span>
                <span className="video-time">01:45 / 03:26</span>
                <div className="progress-bar" />
                <div className="volume-control">
                  <span>🔊</span>
                </div>
              </div>
            </div>
            <div className="channel-info">
              <div className="channel-avatar">E</div>
              <div className="channel-name">Eventify Media</div>
              <button className="subscribe-btn">SUBSCRIBE</button>
            </div>
          </section>
        </>
      )}

      {showPopup && (
        <div className="popup-overlay" onClick={(e) => e.target.className === 'popup-overlay' && setShowPopup(false)}>
          <div className="ticket-popup">
            <div className="popup-header">
              <h2 className="popup-title">{eventData?.title || 'Event'}</h2>
              <button className="close-popup" onClick={() => setShowPopup(false)}>&times;</button>
            </div>

            <div className="ticket-type">
              <span className="ticket-name">Normal Ticket</span>
              <div className="ticket-quantity">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >-</button>
                <span className="quantity-value">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(q => Math.min(ticketsLeft, q + 1))}
                  disabled={quantity >= ticketsLeft}
                >+</button>
              </div>
              {ticketsLeft !== null && (
                <p className="remaining-note">
                  Max you can buy: {ticketsLeft}
                </p>
              )}
            </div>

            <div className="sale-info">
              {typeof eventData?.price === 'number'
                ? `${eventData.price.toFixed(2)} JD +15% tax`
                : ''}
              <br />
              {ticketsLeft !== null && <strong>{ticketsLeft} ticket(s) remaining</strong>}
            </div>

            <div className="order-summary">
              <h4 className="summary-title">Order Summary</h4>
              <div className="summary-row">
                <span>{quantity} x Normal Ticket</span>
                <span>{!isNaN(subtotal) ? subtotal.toFixed(2) : '0.00'} JD</span>
              </div>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{!isNaN(subtotal) ? subtotal.toFixed(2) : '0.00'} JD</span>
              </div>
              <div className="summary-row">
                <span>Fees</span>
                <span>{(taxRate * 100).toFixed(0)}%</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>{!isNaN(total) ? total.toFixed(2) : '0.00'} JD</span>
              </div>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default EventDetail;

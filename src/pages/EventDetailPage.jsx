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
  const [images, setImages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [newImages, setNewImages] = useState([]);
  const isOrganizer = user?.role === 'organizer';
  const [alreadyBought, setAlreadyBought] = useState(0);



  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/events/${eventId}`);
        const data = await res.json();
        setEventData(data);
        setFormData({
          title: data.title,
          description: data.description,
          location: data.location,
          start_time: data.start_time,
          end_time: data.end_time,
          price: data.price,
          total_tickets: data.total_tickets
        });
      } catch (err) {
        console.error('Error fetching event:', err);
      }
    };

    const fetchImages = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/events/${eventId}/images`);
        const data = await res.json();
        setImages(data.map(img => img.image_url));
      } catch (err) {
        console.error('Error fetching images:', err);
      }
    };

    fetchEvent();
    fetchImages();

    const fetchUserTickets = async () => {
  if (user?.id && eventId) {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tickets/purchased?user_id=${user.id}&event_id=${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setAlreadyBought(data.total || 0);
    } catch (err) {
      console.error('Error fetching user ticket count:', err);
    }
  }
};
fetchUserTickets();

  }, [eventId, token, user?.id]);

  const isOwnerOrganizer = user?.role === 'organizer' && user?.id === eventData?.organizer_id;
  const ticketPrice = !isNaN(parseFloat(eventData?.price)) ? parseFloat(eventData.price) : 50;
  const taxRate = 0.15;
  const subtotal = quantity * ticketPrice;
  const total = subtotal + subtotal * taxRate;
  const isPastEvent = eventData && new Date(eventData.start_time) < new Date();
  const totalAvailable = eventData ? eventData.total_tickets - (eventData.tickets_sold || 0) : 0;
  const userRemainingLimit = Math.max(0, 3 - alreadyBought);
  const ticketsLeft = Math.min(totalAvailable, userRemainingLimit);


  const handleCheckout = async () => {
    if (!user) return alert('You must be logged in to purchase tickets.');
    if (ticketsLeft !== null && quantity > ticketsLeft) {
      return alert(`Only ${ticketsLeft} ticket(s) remaining. Please reduce your quantity.`);
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tickets`, {
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (newImages.length > 0) {
        const form = new FormData();
        newImages.forEach((file) => form.append('images', file));

        await fetch(`${process.env.REACT_APP_API_URL}/events/${eventId}/images`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: form
        });
      }

      alert('Event updated successfully!');
      setEditMode(false);
      window.location.reload();
    } catch (err) {
      console.error('Error updating event:', err);
      alert('Update failed.');
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
              <div className="event-date-time">{new Date(eventData.start_time).toLocaleString()}</div>
              <div className="event-location">{eventData.location}</div>

              {isOwnerOrganizer && (
                <div className="organizer-tools">
                  <button onClick={() => setEditMode(true)}>Edit Event</button>
                  <button onClick={() => navigate(`/organizer/events/${eventData.id}/tickets`)}>View Ticket Sales</button>
                </div>
              )}
            </>
          ) : (
            <p>Loading event details...</p>
          )}
        </div>

        <div className="ticket-qr">
          {!isOrganizer && (
  <button
    className="buy-ticket-btn"
    onClick={() => setShowPopup(true)}
    disabled={isPastEvent}
  >
    Buy Ticket Now
  </button>
)}

        </div>
      </div>

      {/* Image slider or fallback image */}
      {eventData && (
        <div className="event-content-wrapper">
          <div className="event-image-column">
            {images.length > 0 ? (
              <div className="event-slider">
                {images.map((url, idx) => (
                  <img
                    key={idx}
                    src={`${process.env.REACT_APP_API_URL}${url}`}
                    alt={`Slide ${idx + 1}`}
                    className="slider-image"
                  />
                ))}
              </div>
            ) : (
              eventData.image_url && (
                <img
                  src={`${process.env.REACT_APP_API_URL}${eventData.image_url}`}
                  alt={eventData.title}
                  className="full-event-image"
                />
              )
            )}
          </div>

          <div className="event-description-box">
            <h2 className="section-title">Event Details</h2>
            {editMode ? (
              <form onSubmit={handleEditSubmit} className="edit-event-form">
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Title" />
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" />
                <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Location" />
                <input type="datetime-local" value={formData.start_time} onChange={(e) => setFormData({ ...formData, start_time: e.target.value })} />
                <input type="datetime-local" value={formData.end_time} onChange={(e) => setFormData({ ...formData, end_time: e.target.value })} />
                <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Price" />
                <input type="number" value={formData.total_tickets} onChange={(e) => setFormData({ ...formData, total_tickets: e.target.value })} placeholder="Total Tickets" />
                <input type="file" multiple onChange={(e) => setNewImages(Array.from(e.target.files))} />
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
              </form>
            ) : (
              <p>{eventData.description || 'No description available.'}</p>
            )}
          </div>
        </div>
      )}

      {!showPopup && eventData && (
        <div className="organizer-contact-card">
          {eventData.organizer_profile_image && (
            <img
              src={`${process.env.REACT_APP_API_URL}${eventData.organizer_profile_image}`}
              alt="Organizer"
              className="organizer-avatar"
            />
          )}
          <div className="organizer-contact-info">
            <h3>Organizer Contact</h3>
            <p><strong>Name:</strong> {eventData.organizer_name || 'N/A'}</p>
            <p><strong>Email:</strong> {eventData.organizer_email || 'N/A'}</p>
          </div>
        </div>
      )}

      {showPopup && !isOrganizer && (
  <div className="popup-overlay" onClick={(e) => e.target.className === 'popup-overlay' && setShowPopup(false)}>
    <div className="ticket-popup">
            <div className="popup-header">
              <h2 className="popup-title">{eventData?.title || 'Event'}</h2>
              <button className="close-popup" onClick={() => setShowPopup(false)}>&times;</button>
            </div>

            <div className="ticket-type">
              <span className="ticket-name">Normal Ticket</span>
              <div className="ticket-quantity">
                <button className="quantity-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span className="quantity-value">{quantity}</span>
                <button className="quantity-btn" onClick={() => setQuantity(q => Math.min(ticketsLeft, q + 1))} disabled={quantity >= ticketsLeft}>+</button>
              </div>
              <p className="remaining-note">Max you can buy: {ticketsLeft}</p>
            </div>

            <div className="sale-info">
              {!isNaN(parseFloat(eventData?.price)) && `${parseFloat(eventData.price).toFixed(2)} JD +15% tax`}
              {ticketsLeft !== null && <strong>{ticketsLeft} ticket(s) remaining</strong>}
            </div>

            <div className="order-summary">
              <h4 className="summary-title">Order Summary</h4>
              <div className="summary-row">
                <span>{quantity} x Normal Ticket</span>
                <span>{!isNaN(subtotal) ? subtotal.toFixed(2) : '0.00'} JD</span>
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

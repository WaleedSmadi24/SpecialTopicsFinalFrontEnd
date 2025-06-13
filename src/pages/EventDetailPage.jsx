import React, { useState } from 'react';
import './CSS/EventDetailPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EventDetail = () => {
  const [quantity, setQuantity] = useState(2);
  const [showPopup, setShowPopup] = useState(false);

  const ticketPrice = 50.00;
  const taxRate = 0.15;
  const subtotal = quantity * ticketPrice;
  const total = subtotal + subtotal * taxRate;

  return (
    <>
      <Header />
      <div className="event-header">
        <div className="event-header-content">
          <h1 className="event-title">La Liga Week 32 Match</h1>
          <p className="event-meta">Football Game</p>
          <div className="event-date-time">Saturday, Jul 20 2025</div>
          <div className="event-location">9:22 Spotify Camp Nou, Barcelona</div>
        </div>
        <div className="ticket-qr">
          <button className="buy-ticket-btn" onClick={() => setShowPopup(true)}>Buy Ticket Now</button>
          <div className="qr-code">
            {/* Simulated QR Code */}
            <svg width="80" height="80" viewBox="0 0 100 100">
              <rect x="10" y="10" width="80" height="80" fill="black" />
              <rect x="20" y="20" width="60" height="60" fill="white" />
              <rect x="30" y="30" width="10" height="10" fill="black" />
              <rect x="50" y="30" width="10" height="10" fill="black" />
              <rect x="30" y="50" width="10" height="10" fill="black" />
              <rect x="60" y="40" width="10" height="30" fill="black" />
            </svg>
          </div>
        </div>
      </div>

      <section className="event-details-section">
        <h2 className="section-title">Event Details</h2>
        <p className="event-description">
          The match will take place at the Estadi Olímpic Lluís Companys and will be the second league meeting this season...
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
          <div className="channel-name">Event Sports</div>
          <button className="subscribe-btn">SUBSCRIBE</button>
        </div>
      </section>

      {showPopup && (
        <div className="popup-overlay" onClick={(e) => e.target.className === 'popup-overlay' && setShowPopup(false)}>
          <div className="ticket-popup">
            <div className="popup-header">
              <h2 className="popup-title">La Liga Week 32 Match</h2>
              <button className="close-popup" onClick={() => setShowPopup(false)}>&times;</button>
            </div>
            <h3>Barcelona VS Sevilla</h3>
            <div className="ticket-type">
              <span className="ticket-name">Normal Ticket</span>
              <div className="ticket-quantity">
                <button className="quantity-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span className="quantity-value">{quantity}</span>
                <button className="quantity-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>
            <div className="sale-info">50.00 JD +15% tax<br />Sale Ends in 2 Days</div>
            <div className="order-summary">
              <h4 className="summary-title">Order Summary</h4>
              <div className="summary-row"><span>{quantity} x Normal Ticket</span><span>{subtotal.toFixed(2)} JD</span></div>
              <div className="summary-row"><span>Subtotal</span><span>{subtotal.toFixed(2)} JD</span></div>
              <div className="summary-row"><span>Fees</span><span>{(taxRate * 100).toFixed(0)}%</span></div>
              <div className="summary-row total-row"><span>Total</span><span>{total.toFixed(2)} JD</span></div>
            </div>
            <button className="checkout-btn">Checkout</button>
            <div className="event-details-popup">
              <p>The match will take place at the Estadi Olimpic Lluís Companys and will be the second league meeting...</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default EventDetail;

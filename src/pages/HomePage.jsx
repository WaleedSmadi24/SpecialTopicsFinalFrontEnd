import './CSS/HomePage.css';
import Header from '../components/Header';
import ticketImage from '../assets/Ticket-HomePage.png';
import eventPerson from '../assets/PersonAtEvent.png';
import rugbyMatch from '../assets/RugbyMatch.jpg';
import bigSamConcert from '../assets/BigSamConcert.jpeg';
import barcelonaMatch from '../assets/Barcelona-Match.jpeg';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
    <Header />

      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Welcome to <span>Eventify</span></h1>
            <p>Create. Discover. Connect.</p>
          </div>
          <div className="hero-image">
            <img src={ticketImage} alt="Event ticket" className="ticket-img" />
          </div>
        </div>
      </section>

      <section className="platform-features">
        <h2>Your One-Stop Platform for<br />Events & Tickets</h2>
        <p>Whether you're organizing an event or looking to attend one, Eventify simplifies how you discover, promote, and participate in events of all sizes.</p>
        <img src={eventPerson} alt="Person at event" className="platform-img" />
      </section>

      <section className="features-section">
  <div className="features-block">
    <h2>🎟️ For Attendees</h2>
    <div className="feature-cards">
      <div className="feature-card">
        <p>🔍 Discover events near you or online</p>
      </div>
      <div className="feature-card">
        <p>🎫 Access your tickets anytime</p>
      </div>
      <div className="feature-card">
        <p>❤️ Save your favorite events easily</p>
      </div>
    </div>
    <Link to="/events" className="action-button">
  Browse Events
</Link>

  </div>

  <div className="features-block">
    <h2>🧑‍💼 For Organizers</h2>
    <div className="feature-cards">
      <div className="feature-card">
        <p>🛠️ Create and publish events in minutes</p>
      </div>
      <div className="feature-card">
        <p>📊 Manage ticket sales and attendees</p>
      </div>
      <div className="feature-card">
        <p>📢 Send real-time updates</p>
      </div>
    </div>
    <button className="action-button">Create an Event</button>
  </div>
</section>


      <section className="upcoming-events">
        <h2>Upcoming Events</h2>
        <div className="events-grid">
          <div className="event-card">
            <img src={rugbyMatch} alt="Rugby Match" className="event-img" />
            <div className="event-details">
              <h3>Rugby Match School of Tareq</h3>
              <p>Tareq School</p>
            </div>
          </div>
          <div className="event-card">
            <img src={bigSamConcert} alt="BigJam Concert" className="event-img" />
            <div className="event-details">
              <h3>BigJam Concert</h3>
              <p>Tareq School</p>
            </div>
          </div>
          <div className="event-card">
            <img src={barcelonaMatch} alt="Barcelona Match" className="event-img" />
            <div className="event-details">
              <h3>Barcelona La Liga Match</h3>
              <p>Camp Nou</p>
            </div>
          </div>
        </div>
      </section>

      <section className="get-started">
        <h2>Get Started Today</h2>
        <p>Create an account in less than a minute and start your journey with Eventify.</p>
      </section>
    </>
  );
}

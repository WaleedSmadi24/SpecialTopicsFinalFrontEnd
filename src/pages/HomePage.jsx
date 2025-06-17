import './CSS/HomePage.css';
import Header from '../components/Header';
import ticketImage from '../assets/Ticket-HomePage.png';
import eventPerson from '../assets/PersonAtEvent.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
  fetch('http://localhost:5000/events')
    .then((res) => res.json())
    .then((data) => {
      const now = new Date().getTime();
      const upcoming = data.filter(event => new Date(event.start_time).getTime() > now);
      const shuffled = upcoming.sort(() => Math.random() - 0.5);

      setUpcomingEvents(shuffled);
    })
    .catch((err) => console.error('Failed to load events:', err));
}, []);

const navigate = useNavigate();
const { user } = useAuth();

const handleCreateEventClick = () => {
  if (user && user.role === 'organizer') {
    navigate('/create-event');
  } else {
    navigate('/login');
  }
};



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
          <Link to="/events" className="action-button">Browse Events</Link>
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
          <button className="action-button" onClick={handleCreateEventClick}>
  Create an Event
</button>

        </div>
      </section>

      <section className="upcoming-events">
  <h2>Upcoming Events</h2>
  {upcomingEvents.length === 0 ? (
    <p style={{ textAlign: 'center', color: '#888' }}>No upcoming events at the moment.</p>
  ) : (
    <div className="events-grid">
      {upcomingEvents.map(event => (
        <Link
          key={event.id}
          to={`/events/${event.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div className="event-card">
            <img
  src={`http://localhost:5000${event.image_url}`}
  alt={event.title}
  className="event-img"
/>


            <div className="event-details">
  <h3>{event.title}</h3>
  <p>{event.location}</p>
  <p style={{ fontSize: '0.85rem', color: '#555', marginTop: '6px' }}>
    {new Date(event.start_time).toLocaleString()}
  </p>
</div>

          </div>
        </Link>
      ))}
    </div>
  )}
</section>


      <section className="get-started">
        <h2>Get Started Today</h2>
        <p>Create an account in less than a minute and start your journey with Eventify.</p>
      </section>
    </>
  );
}

import './CSS/Events.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Events() {
  const [events, setEvents] = useState({ Musical: [], Sports: [], Tech: [] });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/events`);
        const data = await res.json();
        const grouped = { Musical: [], Sports: [], Tech: [] };

        data.forEach((event) => {
          const name = event.category_name?.toLowerCase() || '';
          if (name.includes('tech')) grouped.Tech.push(event);
          else if (name.includes('music')) grouped.Musical.push(event);
          else if (name.includes('sport')) grouped.Sports.push(event);
        });

        for (const key in grouped) {
          grouped[key] = shuffleArray(grouped[key]);
        }

        setEvents(grouped);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };

    fetchEvents();
  }, []);

  const shuffleArray = (arr) => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <>
      <Header />
      <div className="events-page">
        <section className="hero-banner">
          <div className="hero-text">
            <h1>
              The <span className="accent">moment</span> when your<br />
              <span className="accent">heart</span> starts beat <span className="accent">faster</span>
            </h1>
          </div>
        </section>

        {Object.entries(events).map(([category, items]) => (
          <section className="category-section" key={category}>
            <h2>{category}</h2>
            {items.length === 0 ? (
              <p className="no-events-message">No events available in this category.</p>
            ) : (
              <div className="event-grid">
                {items.map((event) => (
                  <div className="event-card" key={event.id}>
                    <div className="event-img-container">
                      <img
                        src={event.image_url ? `${process.env.REACT_APP_API_URL}${event.image_url}` : require('../assets/default.jpg')}
                        alt={event.title}
                        className="event-img"
                      />
                      <div className="event-date">
                        {new Date(event.start_time).toLocaleDateString(undefined, {
                          day: '2-digit',
                          month: 'short'
                        })}
                      </div>
                    </div>
                    <div className="event-details">
                      <h3>{event.title}</h3>
                      <div className="event-info">
                        <div className="event-location">{event.location}</div>
                        <div className="event-time">
                          {new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <Link to={`/events/${event.id}`} className="get-tickets">Get Tickets</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
      <Footer />
    </>
  );
}

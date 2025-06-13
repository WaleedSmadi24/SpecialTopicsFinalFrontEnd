import './CSS/Events.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Events() {
  const events = {
    Musical: [
      {
        date: '20 June',
        image: 'TylorSwift.png',
        title: 'Summer Nights V1 - ft. Taylor Swift',
        location: 'Concert venue',
        time: '8:00PM',
      },
      {
        date: '25 June',
        image: 'BigSam.jpeg',
        title: 'BigSam Concert in Amman',
        location: 'Concert venue',
        time: '7:00PM',
      },
      {
        date: '22 June',
        image: 'KadimAlSaher.jpg',
        title: 'Kadim Al Sahir in Aqaba',
        location: 'Concert venue',
        time: '6:00PM',
      },
    ],
    Sports: [
      {
        date: '28 May',
        image: 'BarcelonaEvent.png',
        title: 'Barcelona La Liga Match',
        location: 'Camp Nou',
        time: '6:00PM',
      },
      {
        date: '15 June',
        image: 'RugbyMatch.jpg',
        title: 'Rugby Match School of Amman',
        location: 'Amman',
        time: '6:00PM',
      },
      {
        date: '31 June',
        image: 'Esports.jpg',
        title: 'National Esports Competition Final Match',
        location: 'The ARC',
        time: '6:00PM',
      },
    ],
    Tech: [
      {
        date: '10 June',
        image: 'PocketGamerConnects.png',
        title: 'Pocket Gamer Connects 2025',
        location: 'Dead Sea',
        time: '10:00AM',
      },
      {
        date: '15 June',
        image: 'Xpand.jpg',
        title: 'Xpand Jordan Conference 2025',
        location: 'King Hussein Business Park',
        time: '11:00AM',
      },
      {
        date: '03 July',
        image: 'JEGESports.jpg',
        title: 'JEG Esports Conference - Amman',
        location: 'The ARC',
        time: '7:00PM',
      },
    ]
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
          <div className="event-grid">
            {items.map((event, index) => (
              <div className="event-card" key={index}>
                <div className="event-img-container">
                  <img src={require(`../assets/${event.image}`)} alt={event.title} className="event-img" />
                  <div className="event-date">{event.date}</div>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <div className="event-info">
                    <div className="event-location">{event.location}</div>
                    <div className="event-time">{event.time}</div>
                  </div>
                  <Link to={`/events/${index}`} className="get-tickets">Get Tickets</Link>

                </div>
              </div>
            ))}
            </div>
        </section>
      ))}
    </div>
    <Footer />
    </>
    );
}

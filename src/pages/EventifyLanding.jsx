import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './src/CSS/EventifyLanding.css';

const EventifyLanding = () => {
  return (
    <Container fluid className="eventify-container">
      <Row className="header-section">
        <Col className="text-center">
          <h1 className="welcome-text">Welcome to</h1>
          <h1 className="logo-text">Eventify</h1>
        </Col>
      </Row>

      <Row className="main-section">
        <Col md={6} className="left-section">
          <div className="feature-box">
            <h3>Create Resource Courses</h3>
          </div>
          <h2 className="tagline">Your One-Stop Platform for</h2>
          <h2 className="tagline highlight">Events & Tickets</h2>
          
          <div className="audience-section">
            <div className="audience-box">
              <h4>For Attendees</h4>
            </div>
            <div className="audience-box">
              <h4>For Organizer</h4>
            </div>
          </div>
        </Col>

        <Col md={6} className="right-section">
          <div className="action-box">
            <h3>Create or Promote</h3>
            <p>Cleans of Events</p>
          </div>
          <div className="info-box">
            <p>Learn more about</p>
            <p>Your Free</p>
            <h3>Upcoming Events</h3>
          </div>
          <Button variant="primary" className="cta-button">Get Started Today</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EventifyLanding;
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventifyPage = () => {
  return (
    <Container className="my-5 text-center">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-0">Welcome to</h1>
          <h1 className="display-3 fw-bold text-primary mb-3">Eventify</h1>
          <h2 className="h3 text-muted">Create. Discover. Connect.</h2>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <p className="lead">Your One-Stop Platform for</p>
          <p className="display-5 fw-bold text-primary">Events & Tickets</p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <p className="text-muted small mb-5">
            All Rights Reserved. Please contact us, booking us at home for events and activities.
          </p>

          <Row className="justify-content-center mb-4">
            <Col md={6}>
              <div className="p-3 border rounded">
                <h3 className="h4 text-primary">For Attendees</h3>
                <p className="mb-1">Choose and publish</p>
                <p className="mb-0">Manage ticket sales</p>
              </div>
            </Col>
          </Row>

          <Button variant="primary" size="lg" className="px-5">
            Get Started Today
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EventifyPage;
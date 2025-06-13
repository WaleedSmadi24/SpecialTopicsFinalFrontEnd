import React, { useState, useRef, useEffect } from 'react';
import './CSS/OrganizerCreateEvent.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CreateEvent = () => {
  const [fileName, setFileName] = useState('Click to upload or drag and drop');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const formatDateTime = (date) => date.toISOString().slice(0, 16);

    document.getElementById('startDateTime').value = formatDateTime(now);
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    document.getElementById('endDateTime').value = formatDateTime(oneHourLater);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit. Please choose a smaller file.');
        e.target.value = '';
        setFileName('Click to upload or drag and drop');
      } else {
        setFileName(file.name);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      fileInputRef.current.files = e.dataTransfer.files;
      fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/events');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Event created successfully!');
    e.target.reset();
    setFileName('Click to upload or drag and drop');
  };

  return (
    <>
    <Header />
    
    <div className="create-event-container">
      <h1 className="create-event-title">Create a New Event</h1>
      <p className="create-event-subtitle">
        Fill out the details below to publish your event. Make sure everything is accurate — these details will be shown to attendees.
      </p>

      <form onSubmit={handleSubmit} id="eventForm">
        {/* Event Title */}
        <div className="form-group">
          <label className="form-label">Event Title</label>
          <p className="form-hint">Example: "Tech Innovation Summit 2022"</p>
          <input type="text" className="form-input" placeholder="Event Title" required />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Event Description</label>
          <p className="form-hint">Include agenda, speakers, or anything attendees need to know.</p>
          <textarea className="form-textarea" placeholder="Event Description" required></textarea>
        </div>

        {/* Image */}
        <div className="form-group">
          <label className="form-label">Event Banner / Image</label>
          <p className="form-hint">JPEG or PNG (max 5MB)</p>
          <div
            className="file-upload"
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="file-upload-icon">📷</div>
            <div className="file-upload-text">{fileName}</div>
            <div className="file-upload-hint">JPEG or PNG (max 5MB)</div>
            <input
              type="file"
              accept="image/jpeg,image/png"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Location */}
        <div className="form-group">
          <label className="form-label">Location</label>
          <p className="form-hint">Physical address or write "Online"</p>
          <input type="text" className="form-input" placeholder="Location or 'Online'" required />
        </div>

        {/* Date & Time */}
        <div className="form-group">
          <label className="form-label">Date & Time</label>
          <div className="datetime-inputs">
            <div className="datetime-group">
              <label className="form-label">Start Date & Time</label>
              <input type="datetime-local" className="form-input" id="startDateTime" required />
            </div>
            <div className="datetime-group">
              <label className="form-label">End Date & Time</label>
              <input type="datetime-local" className="form-input" id="endDateTime" required />
            </div>
          </div>
        </div>

        {/* Ticket Price */}
        <div className="form-group">
          <label className="form-label">Ticket Price</label>
          <p className="form-hint">Use "0" if it's a free event</p>
          <input type="number" className="form-input" placeholder="0.00" min="0" step="0.01" required />
        </div>

        {/* Total Tickets */}
        <div className="form-group">
          <label className="form-label">Total Tickets Available</label>
          <input type="number" className="form-input" placeholder="Number of Tickets" min="1" required />
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="submit-btn">Add Event</button>
        </div>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default CreateEvent;

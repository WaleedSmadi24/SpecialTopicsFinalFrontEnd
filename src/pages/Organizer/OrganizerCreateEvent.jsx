import React, { useState, useRef, useEffect } from 'react';
import './CSS/OrganizerCreateEvent.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CreateEvent = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [fileName, setFileName] = useState('Click to upload or drag and drop');
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    start_time: '',
    end_time: '',
    price: '',
    total_tickets: '',
    category_id: ''
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const formatDateTime = (date) => date.toISOString().slice(0, 16);
    setFormData((prev) => ({
      ...prev,
      start_time: formatDateTime(now),
      end_time: formatDateTime(new Date(now.getTime() + 3600000)),
    }));

    const loadCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/events/categories');
        const data = await res.json();
        setCategories(data);
        setFormData(prev => ({ ...prev, category_id: data[0]?.id || '' }));
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };

    loadCategories();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        e.target.value = '';
        setFileName('Click to upload or drag and drop');
        setImageFile(null);
      } else {
        setFileName(file.name);
        setImageFile(file);
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
    if (window.confirm('Cancel event creation?')) {
      navigate('/organizer/dashboard');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('location', formData.location);
    form.append('start_time', formData.start_time);
    form.append('end_time', formData.end_time);
    form.append('price', formData.price);
    form.append('total_tickets', formData.total_tickets);
    form.append('category_id', formData.category_id);
    if (imageFile) {
      form.append('image', imageFile);
    }

    try {
      const res = await fetch('http://localhost:5000/organizer/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const result = await res.json();

      if (res.ok) {
        alert('Event created successfully!');
        navigate('/organizer/dashboard');
      } else {
        alert(result.message || 'Failed to create event.');
      }
    } catch (err) {
      console.error('Create event error:', err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className="create-event-container">
        <h1 className="create-event-title">Create a New Event</h1>
        <p className="create-event-subtitle">Fill out the details below to publish your event.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Event Title</label>
            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="Event Title"
              required
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Event Description</label>
            <textarea
              name="description"
              className="form-textarea"
              placeholder="Description"
              required
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Event Banner / Image</label>
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

          {/* 🆕 Category Selector */}
          <div className="form-group">
            <label className="form-label">Event Category</label>
            <select
              name="category_id"
              className="form-input"
              required
              value={formData.category_id}
              onChange={handleInputChange}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              className="form-input"
              placeholder="e.g., HTU Campus or 'Online'"
              required
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date & Time</label>
            <div className="datetime-inputs">
              <div className="datetime-group">
                <label>Start</label>
                <input
                  type="datetime-local"
                  name="start_time"
                  className="form-input"
                  required
                  value={formData.start_time}
                  onChange={handleInputChange}
                />
              </div>
              <div className="datetime-group">
                <label>End</label>
                <input
                  type="datetime-local"
                  name="end_time"
                  className="form-input"
                  required
                  value={formData.end_time}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Ticket Price</label>
            <input
              type="number"
              name="price"
              className="form-input"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Total Tickets</label>
            <input
              type="number"
              name="total_tickets"
              className="form-input"
              placeholder="e.g., 100"
              min="1"
              required
              value={formData.total_tickets}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Event
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateEvent;

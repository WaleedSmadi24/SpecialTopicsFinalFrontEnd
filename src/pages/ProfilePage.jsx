import React, { useState, useEffect } from 'react';
import './CSS/ProfilePage.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // adjust path if needed
import Footer from '../components/Footer';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [photo, setPhoto] = useState('https://via.placeholder.com/150');
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user?.profile_image) {
      setPhoto(`http://localhost:5000${user.profile_image}`);
    }
  }, [user]);

  const toggleEdit = () => setEditing(!editing);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`http://localhost:5000/auth/upload-profile-image/${user.id}`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to upload image');

      const data = await res.json();
      const fullUrl = `http://localhost:5000${data.user.profile_image}`;
      setPhoto(fullUrl);
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (err) {
      console.error('Image upload failed:', err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/auth/update-profile/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, profile_image: user.profile_image }),
      });

      if (!res.ok) throw new Error('Profile update failed');

      const data = await res.json();
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      setEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => {
        setMessage('');
        navigate('/profile');
      }, 1500);
    } catch (err) {
      console.error('Profile update failed:', err);
      setMessage('Update failed. Please try again.');
    }
  };

  return (
    <>
  <Header />

  <div className="profile-page">
    <div className="profile-container">
      <img src={photo} alt="Profile" className="profile-image" />
      <div className="profile-name">{name}</div>
      <div className="profile-email">{email}</div>
      <button className="edit-btn" onClick={toggleEdit}>
        {editing ? 'Cancel' : 'Edit your Info'}
      </button>

      {editing && (
        <form className="edit-form" onSubmit={handleSave}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="photo">Profile Photo</label>
          <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} />

          <button type="submit" className="save-btn">Save</button>
          {message && <p className="success-message">{message}</p>}
        </form>
      )}
    </div>
  </div>

  <Footer />
</>

  );
};

export default ProfilePage;

import React, { useState } from 'react';
import './CSS/ProfilePage.css';

const ProfilePage = () => {
  const [name, setName] = useState('Waleed Smadi');
  const [email, setEmail] = useState('waleedsmadi95@gmail.com');
  const [photo, setPhoto] = useState('https://i.imgur.com/Bq3lFeZ.jpg');
  const [editing, setEditing] = useState(false);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  return (
    <div className="profile-page">
      <header>
        <div className="menu-icon">☰</div>
        <input type="text" placeholder="Search" className="main-search" />
        <div className="profile-settings">
          <img src="https://i.imgur.com/5cK1L3V.png" alt="User" className="user-icon" />
          <div className="settings-icon">⚙️</div>
        </div>
      </header>

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
          </form>
        )}
      </div>
    </div>
    
  );
  
  
};

export default ProfilePage;

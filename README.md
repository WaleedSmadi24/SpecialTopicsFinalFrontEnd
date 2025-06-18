# 🎉 Eventify Frontend

Welcome to the **Eventify Frontend**, a full-stack event ticketing platform built with **React.js**. This frontend app allows attendees to browse events, purchase tickets, and manage their profiles. Organizers can create and manage their events through a dedicated dashboard.

🌐 **Live Frontend**: [https://specialtopicsfinalfrontend-production.up.railway.app](https://specialtopicsfinalfrontend-production.up.railway.app)

---

## 🧱 Tech Stack

- **React.js** (Create React App)
- **React Router DOM** (v6)
- **Context API** for Authentication
- **Chart.js** for Analytics
- **CSS Modules** and plain CSS
- **WeatherAPI.com** (for weather widget)

---

## 🧭 Features Overview

### 🔐 Authentication
- Login & Signup using JWT
- Role-based login: **Attendee** or **Organizer**
- Session persistence via `localStorage`
- Global `AuthContext` for auth state

### 🎫 Attendee Features
- View categorized events (Tech, Musical, Sports)
- Event Detail page:
  - View full event info
  - Organizer contact card
  - Purchase tickets (max 3 per user)
  - Modern ticket modal with total + tax
- Dashboard:
  - Total tickets bought
  - Total spent (includes 15% tax)
  - Distinct events attended
- Profile:
  - View/edit name/email
  - Upload/update profile photo

### 🧑‍💼 Organizer Features
- Dashboard:
  - View all created events
  - See total tickets sold
- Create Event form:
  - Upload event image
  - Choose category
  - Fields: title, description, location, price, date, ticket count
- Organizers **cannot** purchase tickets

### 🌤 Weather Widget
- Live weather for Amman
- Centered in the header
- Non-disruptive to layout

---

## 🗂 Project Structure

src/
├── assets/ # Static assets (images, icons, etc.)
├── components/ # Reusable components (Header, Footer, etc.)
├── context/
│ └── AuthContext.jsx # Auth provider and context hook
├── pages/
│ ├── Attendee/
│ │ ├── CSS/ # Styles for Attendee pages
│ │ └── AttendeeDB.jsx # Attendee Dashboard
│ ├── Organizer/ # Organizer-specific pages
│ ├── CSS/ # Global/shared page styles
│ ├── 404NotFound.jsx # Not Found Page
│ ├── AboutUs.jsx # Static About Page
│ ├── EventDetailPage.jsx # Event Details + Ticket Purchase Modal
│ ├── EventifyLanding.jsx # Home/Landing Page
│ ├── Events.jsx # Grouped Events Listing
│ ├── HomePage.jsx # Optional main landing
│ ├── Login.jsx # Login Page
│ ├── Signup.jsx # Signup Page
│ ├── ProfilePage.jsx # Profile + Image Upload
├── routes/ # Route protection / role-based access
├── App.js # Main app component + routes
├── index.css # Global styles
└── index.js # App entry point


## ✅ Setup Locally

### 1. Clone the Repo
git clone https://github.com/your-username/eventify-frontend.git
cd eventify-frontend
### 2. Install Dependencies
npm install
### 3. Start Development Server
npm start
Runs on http://localhost:3000 by default.

## 🔄 API Integration
This frontend is powered by the Express/PostgreSQL backend:

### 🔗 Backend URL: https://specialtopicsfinalbackend-production.up.railway.app

### Key Endpoints Used:

GET /events – Fetch all events

GET /events/:id – Event details

POST /auth/login / auth/register – Auth endpoints

GET /tickets/me – Attendee tickets

POST /tickets – Ticket purchase

POST /events – Organizer creates event

GET /organizer/events – Organizer's events

## 📦 Dependencies
react-router-dom

chart.js

chartjs-plugin-datalabels

react-chartjs-2

uuid

moment

classnames

## 🌍 Deployment Notes
The frontend is deployed using Railway.

### To Build for Production:
npm run build

#### Make sure your package.json contains the correct homepage field if needed.


## 🤝 Contributing
Pull requests and forks are welcome!

## 📃 License
Licensed under the MIT License.
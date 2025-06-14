import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/HomePage';
import Events from '../pages/Events';
import EventDetail from '../pages/EventDetailPage';
import ProfilePage from '../pages/ProfilePage';
import AttendeeDashboard from '../pages/Attendee/AttendeeDB';
import OrganizerDashboard from '../pages/Organizer/OrganizerDB';
import OrganizerCreateEvent from '../pages/Organizer/OrganizerCreateEvent';
import NotFound from '../pages/404NotFound';
// import all other pages...

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:eventId" element={<EventDetail />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/attendee/dashboard" element={<AttendeeDashboard />} />
      <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
      <Route path="/organizer/create-event" element={<OrganizerCreateEvent />} />
      <Route path="/organizer/events/:eventId" element={<EventDetail />} />

      {<Route path="*" element={<NotFound />} />}
      {/* Add the rest of the routes here */}
    </Routes>
  );
}

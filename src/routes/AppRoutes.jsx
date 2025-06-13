import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/HomePage';
import Events from '../pages/Events';
import EventDetail from '../pages/EventDetailPage';
import ProfilePage from '../pages/ProfilePage';
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
      {<Route path="*" element={<NotFound />} />}
      {/* Add the rest of the routes here */}
    </Routes>
  );
}

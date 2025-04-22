
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import MinimalLayout from './layouts/MinimalLayout';

// Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import EventDetailPage from './pages/EventDetailPage';
import PhotoDetailPage from './pages/PhotoDetailPage';
import PhotographerDashboard from './pages/PhotographerDashboard';
import PhotographerProfilePage from './pages/PhotographerProfilePage';
import AllEventsPage from './pages/AllEventsPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Theme
import { ThemeProvider } from './components/common/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/events" element={<AllEventsPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="/event/:eventId/photo/:photoId" element={<MinimalLayout />}>
            <Route index element={<PhotoDetailPage />} />
          </Route>
          <Route path="/dashboard" element={<PhotographerDashboard />} />
          <Route path="/photographer/:id" element={<MainLayout />}>
            <Route index element={<PhotographerProfilePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
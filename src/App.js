import React, { useEffect} from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import LoadingOverlay from './components/LoadingOverlay';

// 👇 Inner component where hooks can be used safely
const AppWithRouterLogic = () => {
  const location = useLocation();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [location, setLoading]);

  return (
    <>
      <LoadingOverlay />
      <AppRoutes />
    </>
  );
};

function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppWithRouterLogic />
        </AuthProvider>
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;

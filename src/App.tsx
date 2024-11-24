import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { Roles } from './constant/enum';
import Cookies from 'js-cookie';

// Helper function to check authentication
const isAuthenticated = (): boolean => {
  try {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      const username = JSON.parse(userCookie)?.username;
      return !!username; // Returns true if username exists, otherwise false
    }
  } catch (error) {
    console.error('Failed to parse cookie data:', error);
  }
  return false;
};

// PrivateRoute Component
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard role={Roles.EMPLOYEE} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

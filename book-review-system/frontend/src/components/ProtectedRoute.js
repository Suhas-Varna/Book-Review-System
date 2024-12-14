import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');  // Check if the token exists

  if (!isAuthenticated) {
    return <Navigate to="/login" />;  // Redirect to login if not authenticated
  }

  return children;  // Return the protected route children if authenticated
};

export default ProtectedRoute;

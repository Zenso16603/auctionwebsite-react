import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // Check if token exists in localStorage

  if (!token) {
    // If no token is found, redirect to login page
    return <Navigate to="/login" />;
  }

  // If token is found, render the children (the portal in this case)
  return children;
};

export default PrivateRoute;

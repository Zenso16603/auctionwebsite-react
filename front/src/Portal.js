import React from 'react';
import { useNavigate } from 'react-router-dom';

function Portal() {
  const navigate = useNavigate();  // Use useNavigate hook for programmatic navigation

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token from localStorage
    navigate('/login');  // Redirect to login page
  };

  return (
    <div>
      <h2>Welcome to the Portal!</h2>
      {/* Logout button */}
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Portal;

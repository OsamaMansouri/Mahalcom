import React from 'react';
import { Navigate } from 'react-router-dom';

// A higher-order component for role-based authorization
const withRole = (allowedRoles) => (Component) => {
  return (props) => {
    const userRole = localStorage.getItem('userRole');

    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/dashboard/default" />;
    }

    return <Component {...props} />;
  };
};

export default withRole;

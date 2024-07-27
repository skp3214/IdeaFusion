// PublicRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.status);
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { user } = useAuth();

    // Check if user is authenticated
    // In a real app with proper decoding, check for expiration too
    // For now, existence of user object (set in AuthContext) is the check
    const isAuthenticated = user || localStorage.getItem('access_token');

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

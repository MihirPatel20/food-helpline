import { Navigate } from 'react-router-dom';
import { authService } from '../services/api';

const ProtectedRoute = ({ children }) => {
  const user = authService.getCurrentUser();
  const token = localStorage.getItem('token');

  if (!user || !token) {
    // User is not logged in
    return <Navigate to="/login" replace />;
  }

  // Check if token is expired (you might want to implement this)
  // For now, we'll just check if token exists

  return children;
};

export default ProtectedRoute; 
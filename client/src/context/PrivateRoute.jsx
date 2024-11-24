import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '@/context/AppContext'; // Your AuthProvider context

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext); // Use AuthContext to check if the user is logged in

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log(isAuthenticated)
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, allow access to the child components (e.g., dashboard)
  return children;
};

export default PrivateRoute;

// Import Navigate component from React Router to programmatically redirect users
import { Navigate } from "react-router-dom";

// Import authentication context to access user info and loading state
import { useAuth } from "../context/AuthContext";

// ProtectedRoute component wraps protected pages
export default function ProtectedRoute({ children }) {

// Destructure user and loading state from AuthContext
  const { user, loading } = useAuth();

// While the auth state is loading (e.g., fetching current user from server)
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

// If no user is logged in, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

// If user is authenticated, render the protected content
  return children;
}
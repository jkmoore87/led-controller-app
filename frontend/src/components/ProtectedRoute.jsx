// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    // optional spinner or placeholder
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    // user not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  // user is logged in → render the protected content
  return children;
}

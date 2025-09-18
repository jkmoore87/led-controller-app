// Import React hooks for context, state, and side effects
import { createContext, useContext, useEffect, useState } from "react";

// Import useNavigate to programmatically navigate routes
import { useNavigate } from "react-router-dom";

// Import a pre-configured Axios instance for API calls
import api from "../api";

// Create a Context for authentication; initial value is null
const AuthContext = createContext(null);

// AuthProvider wraps the app and provides auth state/functions
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // Stores current logged-in user
  const [loading, setLoading] = useState(true);   // Indicates if auth state is being initialized
  const navigate = useNavigate();   // Used to redirect users after login/logout

// -------------------- Auto-login on page load --------------------
  useEffect(() => {

// Check if user info is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));   // Load user into state
    setLoading(false);   // Done initializing
  }, []);

// -------------------- Login function --------------------
  const login = async (email, password) => {
    setLoading(true);   // Show loading state while logging in
    try {

// Call backend API to log in with email and password
      const { data } = await api.post("/auth/login", { email, password });

// Save tokens in localStorage for persistence
      if (data.token) localStorage.setItem("token", data.token);
      if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);

// Save user info in state and localStorage
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/");   // Redirect to home after login
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);   // Hide loading state
    }
  };

// -------------------- Logout function --------------------
  const logout = () => {
    setUser(null);   // Clear user from state
    localStorage.removeItem("token");   // Remove token from localStorage
    localStorage.removeItem("refreshToken");   // Remove refreshToken from localStorage
    localStorage.removeItem("user");   // Remove user from localStorage
    navigate("/login");   // Redirect to login page
  };

// Provide auth state and functions
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

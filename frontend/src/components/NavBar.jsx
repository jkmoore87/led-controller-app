// Import Link component to navigate between routes without full page reload
import { Link } from "react-router-dom";

// Import authentication context to access user info and logout functionality
import { useAuth } from "../context/AuthContext";

// NavBar functional component
export default function NavBar() {

// Destructure values from AuthContext: user object, logout function, and loggingOut state
  const { user, logout, loggingOut } = useAuth();

  return (
// Main navigation bar container
    <nav className="bg-gray-800 text-white flex justify-between items-center px-6 py-4 shadow-md">
      
      {/* Left section: App name */}
      <div className="text-xl font-bold">
        <Link to="/">LED Controller App</Link>
      </div>

      {/* Right section: Navigation links and user actions */}
      <div className="flex items-center space-x-4">
        {/* Always visible links */}
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/resources" className="hover:text-gray-300">Resources</Link>

        {/* Links visible only if the user is logged in */}
        {user && (
          <>
            <Link to="/forum" className="hover:text-gray-300">Forum</Link>
            <Link to="/led-controller" className="hover:text-gray-300">LED Controller</Link>
            
            {/* Welcome message custom to user logged in */}
            <span className="ml-2 font-bold pulse-gold">
              {user && <span className="text-yellow-500 text-lg">✨Welcome, {user.name}✨</span>}
            </span>
          </>
        )}

        {/* Rightmost button: Login/Logout/Logging Out */}
        {loggingOut ? (

// If logging out, show an animated "Logging out…" message
          <span className="animate-pulse px-4 py-2 bg-red-600 rounded">Logging out…</span>
        ) : user ? (

// If user is logged in, show Logout button
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
          >
            Logout
          </button>
        ) : (
          
// If no user is logged in, show Login button
          <Link
            to="/login"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

// components/NavBar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout, loggingOut } = useAuth();

  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center px-6 py-4 shadow-md">
      {/* Left: App Name */}
      <div className="text-xl font-bold">
        <Link to="/">LED Controller App</Link>
      </div>

      {/* Right: Links */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/resources" className="hover:text-gray-300">Resources</Link>

        {user && (
          <>
            <Link to="/forum" className="hover:text-gray-300">Forum</Link>
            <Link to="/led-controller" className="hover:text-gray-300">LED Controller</Link>
            <span className="ml-2 font-bold pulse-gold">
              Welcome, {user.name || user.email}
            </span>
          </>
        )}

        {loggingOut ? (
          <span className="animate-pulse px-4 py-2 bg-red-600 rounded">Logging out…</span>
        ) : user ? (
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
          >
            Logout
          </button>
        ) : (
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

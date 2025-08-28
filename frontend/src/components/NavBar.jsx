import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 text-white">
      {/* Left side: brand/title */}
      <div className="font-bold text-lg">
        LED Controller Application
      </div>

      {/* Right side: links */}
      <div className="flex space-x-4">
        <Link to="/">Home</Link>
        <Link to="/forum">Forum</Link>
        <Link to="/led-controller">LED Controller</Link>
        <Link to="/resources">Resources</Link>

        {!currentUser && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {currentUser && (
          <>
            <span>✨Welcome, {currentUser.firstName || currentUser.name}!</span>
            <Link to="#" onClick={handleLogout}>
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

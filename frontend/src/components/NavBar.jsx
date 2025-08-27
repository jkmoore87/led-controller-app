import { Link } from "react-router-dom";

export default function NavBar({ user, onLogout }) {
  return (
    <nav className="flex items-center justify-between p-4 bg-black border-b border-cyan-500/30 glow">
      <h1 className="text-2xl font-bold neon-blue">LED Controller</h1>
      <div className="flex space-x-6">
        <Link className="neon-blue hover:glow" to="/">Home</Link>
        {user && (
          <>
            <Link className="neon-blue hover:glow" to="/controller">Controller</Link>
            <Link className="neon-blue hover:glow" to="/forum">Forum</Link>
            <Link className="neon-blue hover:glow" to="/resources">Resources</Link>
            <button className="neon-blue glow" onClick={onLogout}>Logout</button>
          </>
        )}
        {!user && (
          <>
            <Link className="neon-blue hover:glow" to="/login">Login</Link>
            <Link className="neon-blue hover:glow" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

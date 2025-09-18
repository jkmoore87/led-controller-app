import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-white">
      <h1 className="text-5xl font-extrabold neon-blue mb-6 text-center drop-shadow-[0_0_20px_#00ffff]">
  <span className="pulse-glow">Welcome to Your LED Controller App</span>
      </h1>
      <p className="text-lg text-center mb-8 neon-blue/70 max-w-xl">
        Control your LED lights, explore community creations, and follow step-by-step guides to make your setup shine!
      </p>

      <div className="flex space-x-6">
        <Link
          to="/login"
          className="py-3 px-6 neon-blue glow font-bold rounded-lg text-lg hover:bg-cyan-500 hover:text-black transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="py-3 px-6 neon-blue glow font-bold rounded-lg text-lg hover:bg-cyan-500 hover:text-black transition"
        >
          Register
        </Link>
      </div>

      <div className="mt-12 max-w-2xl text-center neon-blue/50">
        <h2 className="text-2xl font-bold mb-2 neon-blue">Quick Start</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Register an account or login.</li>
          <li>Connect your LED device to the controller page.</li>
          <li>Customize colors, brightness, and animations.</li>
          <li>Visit the forum to share or explore creations.</li>
          <li>Download guides and resources from the resources page.</li>
        </ol>
      </div>
    </div>
  );
}
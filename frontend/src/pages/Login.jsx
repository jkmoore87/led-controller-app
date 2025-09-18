// Import React hooks
import { useState } from "react";

// Import AuthContext hook for login functionality
import { useAuth } from "../context/AuthContext";

export default function Login() {

// -------------------- State --------------------
// Form state to track email and password inputs
  const [form, setForm] = useState({ email: "", password: "" });
  
// Extract login function from AuthContext
  const { login } = useAuth();

// -------------------- Handlers --------------------
// Update form state when input changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

// Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();   // Prevent reload
    console.log("Submitting login form:", form);   // Debugging
    login(form.email, form.password);   // Delegate login to AuthContext
  };

// -------------------- Render --------------------
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {/* Login form container */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md p-8 bg-gray-900 rounded-xl space-y-4"
      >
        {/* Form title */}
        <h2 className="text-3xl font-bold text-center text-cyan-400">
          Login
        </h2>

        {/* Email input */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
          required
        />

        {/* Password input */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          className="p-2 rounded bg-cyan-500 hover:bg-cyan-600 text-black font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
}

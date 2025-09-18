// Import React hooks
import { useState } from "react";

// Import navigation hook from React Router
import { useNavigate } from "react-router-dom";

// Import pre-configured Axios instance for API calls
import api from "../api";

// Register page component
export default function Register({ setCurrentUser }) {

// -------------------- State --------------------
// Form state for firstName, lastName, email, and password
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

// Hook to navigate programmatically after registration
  const navigate = useNavigate();

// -------------------- Handlers --------------------
// Update form state dynamically based on input name
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

// Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();   // Prevent page reload
    try {
      
// Send registration data to backend
      const { data } = await api.post('/auth/register', form);

// Save tokens and user info to localStorage
      if (data.token) localStorage.setItem('token', data.token);
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

// Optionally update parent state if setCurrentUser provided
      if (setCurrentUser) setCurrentUser(data.user);

// After registering, navigate to login page for sign-in
      navigate('/login');
    } catch (err) {
      
// Show error message if registration fails
      alert(err.response?.data?.message || err.message || 'Register failed');
    }
  };

  // -------------------- Render --------------------
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {/* Registration form container */}
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md p-8 bg-gray-900 rounded-xl glow space-y-4">
        {/* Form title */}
        <h2 className="text-3xl font-bold text-center neon-blue">Register</h2>

        {/* Form inputs */}
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* Submit button */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

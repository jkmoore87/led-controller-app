// pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🚀 Submitting login form:", form); // debug
    login(form.email, form.password); // ✅ delegate to AuthContext
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md p-8 bg-gray-900 rounded-xl space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-cyan-400">
          Login
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
          required
        />

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

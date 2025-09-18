import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register({ setCurrentUser }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', form);
      if (data.token) localStorage.setItem('token', data.token);
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
  if (setCurrentUser) setCurrentUser(data.user);
  // After registering, route the user to the login page so they can sign in
  navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Register failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md p-8 bg-gray-900 rounded-xl glow space-y-4">
        <h2 className="text-3xl font-bold text-center neon-blue">Register</h2>
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ setUser }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Register failed");
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/controller");
    } catch (err) {
      alert(err.message);
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

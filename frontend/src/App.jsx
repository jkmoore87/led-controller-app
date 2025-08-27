import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import LEDController from "./pages/LEDController.jsx";
import Resource from "./pages/Resource.jsx";
import Forum from "./pages/Forum.jsx";

function ProtectedRoute({ user, children }) {
  if (!user) return <Login setUser={() => {}} />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        <Route
          path="/controller"
          element={
            <ProtectedRoute user={user}>
              <LEDController />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <ProtectedRoute user={user}>
              <Resource />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forum"
          element={
            <ProtectedRoute user={user}>
              <Forum />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

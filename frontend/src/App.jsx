import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Forum from "./pages/Forum";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import LEDController from "./pages/LEDController";
import Resource from "./pages/Resource";

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <Router>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
        <Route path="/forum" element={<Forum currentUser={currentUser} />} />
        <Route path="/led-controller" element={<LEDController currentUser={currentUser} />} />
        <Route path="/resources" element={<Resource />} />
      </Routes>
    </Router>
  );
}

export default App;

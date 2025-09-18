// React Router imports
import { Routes, Route } from "react-router-dom";

// Components
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Forum from "./pages/Forum";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import LEDController from "./pages/LEDController";
import Resource from "./pages/Resource";

function App() {
  return (
    <>
      {/* Navigation bar at the top of every page */}
      <NavBar />

      {/* Define app routes */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resources" element={<Resource />} />

        {/* Protected routes: only accessible if logged in */}
        <Route
          path="/forum"
          element={
            <ProtectedRoute>
              <Forum /> {/* Forum page for user posts */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/led-controller"
          element={
            <ProtectedRoute>
              <LEDController /> {/* LED controller page */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Forum from "./pages/Forum";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import LEDController from "./pages/LEDController";
import Resource from "./pages/Resource";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/forum"
          element={
            <ProtectedRoute>
              <Forum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/led-controller"
          element={
            <ProtectedRoute>
              <LEDController />
            </ProtectedRoute>
          }
        />
        <Route path="/resources" element={<Resource />} />
      </Routes>
    </>
  );
}

export default App;

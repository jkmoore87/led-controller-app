import React from "react";   // React library for building UI components
import ReactDOM from "react-dom/client";   // React DOM for rendering to the browser
import App from "./App";   // Main App component
import { AuthProvider } from "./context/AuthContext";   // Context for authentication state
import { BrowserRouter } from "react-router-dom";   // Router for client-side navigation
import "./index.css";   // Global CSS (Tailwind + custom styles)

// Create the root React element and render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Enable React strict mode for highlighting potential problems */}
    <BrowserRouter>
      {/* Wrap the app in BrowserRouter to enable routing */}
      <AuthProvider>
        {/* Provide authentication context to all child components */}
        <App /> {/* Render the main application component */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
import express from "express";   // Express framework for building the API
import cors from "cors";   // Middleware to enable Cross-Origin Resource Sharing
import mongoose from "mongoose";   // ODM for MongoDB
import dotenv from "dotenv";   // Load environment variables from .env
import authRoutes from "./routes/auth.js";   // Authentication routes
import ledRoutes from "./routes/led.js";   // LED control routes
import forumRoutes from "./routes/forum.js";   // Forum routes
import { CLIENT_ORIGIN, MONGO_URI } from "./config.js";   // Configuration constants

// Load environment variables from .env file
dotenv.config();

// Create an Express application instance
const app = express();

// -------------------- Middleware --------------------

// Enable CORS for the frontend origin
app.use(cors({ origin: CLIENT_ORIGIN }));

// Parse incoming JSON requests automatically
app.use(express.json());

// -------------------- Database --------------------

// MongoDB connection string
const MONGO_URL = MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))   // Log success
  .catch(err => console.error("MongoDB error:", err));   // Log any errors

// -------------------- Routes --------------------

// Route group for authentication
app.use("/api/auth", authRoutes);

// Route group for LED control
app.use("/api/led", ledRoutes);

// Route group for forum posts
app.use("/api/forum", forumRoutes);

// -------------------- Server --------------------

// Define the port the server will listen on
const PORT = process.env.PORT || 5000;

// Start the server and listen on the defined port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

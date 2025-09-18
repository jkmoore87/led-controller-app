import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import ledRoutes from "./routes/led.js";
import forumRoutes from "./routes/forum.js";
import { CLIENT_ORIGIN, MONGO_URI } from "./config.js";

dotenv.config();

const app = express(); // Create Express app instance

// CORS + JSON
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// MongoDB
const MONGO_URL = MONGO_URI; // MongoDB connection string
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/led", ledRoutes);
app.use("/api/forum", forumRoutes);

const PORT = process.env.PORT || 5000; // Server port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

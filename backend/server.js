import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import ledRoutes from "./routes/led.js";

dotenv.config();

const app = express();

// CORS + JSON
app.use(cors());
app.use(express.json());

// MongoDB
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/led-controller";
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/led", ledRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

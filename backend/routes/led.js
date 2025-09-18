import express from "express";   // Express framework
import axios from "axios";   // for calling the ESP32 API
import { authRequired } from "../middleware/auth.js";   // authentication middleware

// Create a new Express router
const router = express.Router();

// In-memory LED state (for demo purposes; replace with DB in production).
let ledState = { color: "#00ffff", brightness: 50, animation: "Static" };
const ESP32_IP = "192.168.1.100"; // replace with ESP32 IP

// Set LED state and notify ESP32.
router.post("/led", authRequired, async (req, res) => {
  const { color, brightness, animation } = req.body;
  ledState = { color, brightness, animation };

  try {

// Try to call the ESP32; if unreachable, return a message instead of failing completely
    try {
      await axios.post(`http://${ESP32_IP}/set-led`, ledState, { timeout: 3000 });
      res.json({ message: "LED updated on ESP32!", state: ledState });
    } catch (espErr) {
      console.warn('ESP32 unreachable or error:', espErr.message);

// Return success for the API call but note that the device could not be reached.
      res.json({ message: "LED settings saved locally but ESP32 unreachable.", state: ledState, espError: espErr.message });
    }
  } catch (err) {
    console.error("ESP32 error:", err);
    res.status(500).json({ message: "Failed to update LED", error: err.message });
  }
});

// Get current LED state.
router.get("/state", authRequired, (req, res) => {
  res.json(ledState);
});

// Export the router to use in the main server file
export default router;
import express from "express";
import axios from "axios";
const router = express.Router();

let ledState = { color: "#00ffff", brightness: 50, animation: "Static" };
const ESP32_IP = "192.168.1.100"; // replace with your ESP32 IP

router.post("/set", async (req, res) => {
  const { color, brightness, animation } = req.body;
  ledState = { color, brightness, animation };

  try {
    await axios.post(`http://${ESP32_IP}/set-led`, ledState);
    res.json({ message: "LED updated on ESP32!", state: ledState });
  } catch (err) {
    console.error("ESP32 error:", err);
    res.status(500).json({ message: "Failed to update LED", error: err.message });
  }
});

router.get("/state", (req, res) => {
  res.json(ledState);
});

export default router;

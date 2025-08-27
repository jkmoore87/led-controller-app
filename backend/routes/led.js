import express from "express";
const router = express.Router();

// Placeholder: get LED status
router.get("/", (req, res) => {
  res.json({ message: "LED Controller API is working!" });
});

// Placeholder: update LED settings
router.post("/update", (req, res) => {
  const { color, brightness, animation } = req.body;
  res.json({ success: true, settings: { color, brightness, animation } });
});

export default router;

import express from "express";
const router = express.Router();

// Placeholder: list resources
router.get("/", (req, res) => {
  res.json({ resources: [] });
});

// Placeholder: add resource
router.post("/", (req, res) => {
  const { title, steps } = req.body;
  res.json({ success: true, resource: { title, steps } });
});

export default router;

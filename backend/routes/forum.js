import express from "express";
const router = express.Router();

// Placeholder: get posts
router.get("/", (req, res) => {
  res.json({ posts: [] });
});

// Placeholder: create post
router.post("/", (req, res) => {
  const { title, body } = req.body;
  res.json({ success: true, post: { title, body } });
});

export default router;

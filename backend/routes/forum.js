import express from "express";
import ForumPost from "../models/ForumPost.js";

const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
  try {
    const { user, title, content, image } = req.body;
    if (!user || !title || !content)
      return res.status(400).json({ message: "Missing fields" });

    const post = new ForumPost({ user, title, content, image });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await ForumPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

export default router;

import express from "express";   // Import Express to create routes
import Post from "../models/Post.js";   // Import the Post model to interact with the posts collection in MongoDB
import { verifyToken } from "../middleware/auth.js";   // Import the verifyToken middleware to protect certain routes

// Create a new Express router
const router = express.Router();

// GET all posts (public)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// CREATE a post (authenticated)
router.post("/", verifyToken, async (req, res) => {
  const { title, content, image } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const post = new Post({
      user: req.user.name,
      userId: req.user.id,
      title,
      content,
      image: image || "",
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// UPDATE a post (authenticated + owner)
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: "You can only edit your own posts" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update post" });
  }
});

// DELETE a post (authenticated + owner)
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: "You can only delete your own posts" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Export the router to use in main server file
export default router;
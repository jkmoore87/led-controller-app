import mongoose from "mongoose";

const ForumPostSchema = new mongoose.Schema({
  user: { type: String, required: true },   // Author name
  title: { type: String, required: true },  // Post title
  content: { type: String, required: true },// Post text
  image: { type: String },                  // Optional image
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ForumPost", ForumPostSchema);

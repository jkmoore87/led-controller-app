// Import mongoose to define schemas and models for MongoDB
import mongoose from "mongoose";

// Define the schema for a "Post" document
const postSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },       // display name
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // owner reference to the User document in the database
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },        // optional image for the post, can be stored as a base64 or URL
  },
  { timestamps: true } // adds createdAt and updatedAt
);

// Create the Post model from the schema
const Post = mongoose.model("Post", postSchema);

// Export the Post model for use in other parts of the application
export default Post;
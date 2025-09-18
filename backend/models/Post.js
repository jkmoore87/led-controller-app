import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },       // display name
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // owner reference
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },        // base64 or URL
  },
  { timestamps: true } // adds createdAt and updatedAt
);

const Post = mongoose.model("Post", postSchema);

export default Post;

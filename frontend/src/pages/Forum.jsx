// Import React hooks for state management and lifecycle
import { useState, useEffect } from "react";
// Import pre-configured Axios instance for API calls
import api from "../api";

export default function Forum() {
// -------------------- State --------------------
  const [currentUser, setCurrentUser] = useState(null);   // Logged-in user
  const [posts, setPosts] = useState([]);   // List of forum posts
  const [title, setTitle] = useState("");   // New post title
  const [content, setContent] = useState("");   // New post content
  const [image, setImage] = useState(null);   // Optional image for new post

// Editing state
  const [editingPostId, setEditingPostId] = useState(null); // Post ID being edited
  const [editTitle, setEditTitle] = useState("");   // Edited title
  const [editContent, setEditContent] = useState("");       // Edited content

// -------------------- Effects --------------------
  useEffect(() => {
// Load current user from localStorage on mount
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);

// Fetch all forum posts
    fetchPosts();
  }, []);

// -------------------- Functions --------------------

// Fetch posts from backend API
  const fetchPosts = async () => {
    try {
      const { data } = await api.get("/forum");
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

// Handle new post submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) return;   // Require title and content
    if (!currentUser) {
      alert("You must be logged in to post.");
      return;
    }

// Convert image file to base64 if provided
    let imageData = "";
    if (image) {
      imageData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
      });
    }

    try {

// Send new post to backend
      await api.post("/forum", { title, content, image: imageData });
      await fetchPosts();   // Refresh posts list

// Clear input fields
      setTitle("");
      setContent("");
      setImage(null);
    } catch (err) {
      console.error("Failed to submit post:", err);
      alert("Failed to submit post. Please try again.");
    }
  };

// Handle deleting a post
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/forum/${postId}`);
      await fetchPosts();
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

// Start editing a post
  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

// Save updated post
  const handleUpdate = async (postId) => {
    try {
      await api.put(`/forum/${postId}`, { title: editTitle, content: editContent });
      await fetchPosts();   // Refresh posts
      setEditingPostId(null);   // Exit editing mode
      setEditTitle("");
      setEditContent("");
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("Failed to update post. Please try again.");
    }
  };

// Check if current user can edit/delete the post
  const canEditOrDelete = (post) => {
    
// New posts: check by userId
    if (post.userId && currentUser?._id) {
      return post.userId.toString() === currentUser._id.toString();
    }
    
// Legacy posts: match by username
    if (currentUser && post.user) {
      return currentUser.name === post.user;
    }
    return false;
  };

// -------------------- Render --------------------
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Page title */}
      <h1 className="text-4xl neon-blue font-bold mb-6 text-center pulse-glow">Forum</h1>

      {/* Post Form */}
      <form onSubmit={handleSubmit} className="mb-8 max-w-3xl mx-auto">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-3 rounded-lg bg-gray-900/50 neon-blue/80 text-white mb-2"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your LED creation..."
          className="w-full p-4 rounded-lg bg-gray-900/50 neon-blue/80 text-white mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-2"
        />
        <div className="flex gap-3">
          <button className="py-2 px-4 neon-blue glow font-bold rounded-lg hover:bg-cyan-500 hover:text-black transition">
            Post
          </button>
          <button
            type="button"
            onClick={() => {
              setTitle("");
              setContent("");
              setImage(null);
            }}
            className="py-2 px-4 neon-blue border border-[#00ffff2a] rounded-lg"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Posts List */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {posts.map((post) => (
          <div key={post._id} className="p-4 bg-gray-900/50 rounded-xl glow">
            <div className="flex justify-between mb-1">
              <span className="neon-blue font-bold">{post.user}</span>
              <span className="neon-blue/70 text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>

            {/* Edit mode */}
            {editingPostId === post._id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 mb-2"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(post._id)}
                    className="py-1 px-3 bg-green-600 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPostId(null)}
                    className="py-1 px-3 bg-gray-600 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              
// Display post content
              <>
                <h2 className="neon-blue font-semibold mb-1">{post.title}</h2>
                <p className="neon-blue/80 mb-2">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="User Upload"
                    className="rounded-lg max-w-full max-h-96"
                  />
                )}
              </>
            )}

            {/* Edit/Delete buttons if user owns the post */}
            {canEditOrDelete(post) && (
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="py-1 px-3 bg-blue-600 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="py-1 px-3 bg-red-600 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

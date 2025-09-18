// src/pages/Forum.jsx
import { useState, useEffect } from "react";
import api from "../api";

export default function Forum() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get("/forum");
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    if (!currentUser) {
      alert("You must be logged in to post.");
      return;
    }

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
      await api.post("/forum", { title, content, image: imageData });
      await fetchPosts();
      setTitle("");
      setContent("");
      setImage(null);
    } catch (err) {
      console.error("Failed to submit post:", err);
      alert("Failed to submit post. Please try again.");
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/forum/${postId}`);
      await fetchPosts();
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleUpdate = async (postId) => {
    try {
      await api.put(`/forum/${postId}`, { title: editTitle, content: editContent });
      await fetchPosts();
      setEditingPostId(null);
      setEditTitle("");
      setEditContent("");
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("Failed to update post. Please try again.");
    }
  };

  const canEditOrDelete = (post) => {
    // New posts: userId exists
    if (post.userId && currentUser?._id) {
      return post.userId.toString() === currentUser._id.toString();
    }
    // Legacy posts: match by username
    if (currentUser && post.user) {
      return currentUser.name === post.user;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
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

            {/* Edit/Delete buttons with fallback for old posts */}
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

import { useState, useEffect } from "react";

export default function Forum({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/forum");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    let imageData = "";

    if (image) {
      imageData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
      });
    }

    const newPost = {
      user: currentUser,   // Must be set from logged-in user
      title,
      content,
      image: imageData,
      createdAt: new Date().toISOString(),
    };

    // Optimistic update
    setPosts([newPost, ...posts]);

    try {
      await fetch("/api/forum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
    } catch (err) {
      console.error("Failed to submit post:", err);
    }

    setTitle("");
    setContent("");
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl neon-blue font-bold mb-6 text-center">Forum</h1>

      {/* Post Form */}
      <form onSubmit={handleSubmit} className="mb-8">
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
        <button className="py-2 px-4 neon-blue glow font-bold rounded-lg hover:bg-cyan-500 hover:text-black transition">
          Post
        </button>
      </form>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map((post, idx) => (
          <div key={idx} className="p-4 bg-gray-900/50 rounded-xl glow">
            <div className="flex justify-between mb-1">
              <span className="neon-blue font-bold">{post.user}</span>
              <span className="neon-blue/70 text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <h2 className="neon-blue font-semibold mb-1">{post.title}</h2>
            <p className="neon-blue/80 mb-2">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="User Upload"
                className="rounded-lg max-w-full max-h-96"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

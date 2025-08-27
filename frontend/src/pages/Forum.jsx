import { useState } from "react";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (!newPost) return;
    setPosts([{ text: newPost, id: Date.now() }, ...posts]);
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <h1 className="text-4xl font-bold neon-blue mb-6 text-center">Forum</h1>

      <div className="max-w-2xl mx-auto flex flex-col space-y-4">
        <textarea
          placeholder="Share your LED setup..."
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          className="w-full p-4 bg-gray-900 border border-cyan-400/50 rounded-xl glow resize-none"
          rows={4}
        />
        <button onClick={handlePost} className="w-full py-2 neon-blue glow font-bold">Post</button>

        <div className="space-y-4 mt-6">
          {posts.map(post => (
            <div key={post.id} className="p-4 bg-gray-950 rounded-xl glow border border-cyan-400/50">
              {post.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

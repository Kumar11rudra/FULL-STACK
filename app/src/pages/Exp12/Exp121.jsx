import { useState } from "react";

const initialPosts = [
  { id: 1, title: "Launch plan", author: "Alicia", body: "Ready to publish the new onboarding flow." },
  { id: 2, title: "Community update", author: "Noah", body: "We are collecting feedback for the latest release." },
];

export default function Exp121() {
  const [posts, setPosts] = useState(initialPosts);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");

  const handleAddPost = () => {
    if (!title.trim() || !author.trim() || !body.trim()) return;

    setPosts((currentPosts) => [
      { id: Date.now(), title: title.trim(), author: author.trim(), body: body.trim() },
      ...currentPosts,
    ]);
    setTitle("");
    setAuthor("");
    setBody("");
  };

  return (
    <div className="container" style={{ maxWidth: "1000px" }}>
      <h1>Redux Toolkit State Management</h1>
      <p className="subtitle">Experiment 1.2.1</p>

      <div style={{ display: "grid", gap: "20px", textAlign: "left" }}>
        <div className="card">
          <h2>Create a post</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} />
            <input value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="Author" style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} />
            <textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Content" rows="4" style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} />
            <button className="btn" onClick={handleAddPost} style={{ border: "none", cursor: "pointer", width: "fit-content" }}>
              Add post
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Post list</h2>
          <div style={{ display: "grid", gap: "10px" }}>
            {posts.map((post) => (
              <div key={post.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px" }}>
                <strong>{post.title}</strong>
                <p style={{ marginTop: "4px" }}>By {post.author}</p>
                <p style={{ marginTop: "6px" }}>{post.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

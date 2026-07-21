import { useMemo, useState } from "react";

const initialPosts = [
  { id: 1, title: "Design review", author: "Iris", status: "Published" },
  { id: 2, title: "New campaign", author: "Mina", status: "Draft" },
  { id: 3, title: "Customer notes", author: "Leo", status: "Published" },
];

export default function Exp122() {
  const [posts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return posts.filter((post) => [post.title, post.author, post.status].join(" ").toLowerCase().includes(query));
  }, [posts, searchTerm]);

  const publishedCount = posts.filter((post) => post.status === "Published").length;
  const draftCount = posts.length - publishedCount;

  return (
    <div className="container" style={{ maxWidth: "1000px" }}>
      <h1>Memoized Selectors with Redux Toolkit</h1>
      <p className="subtitle">Experiment 1.2.2</p>

      <div className="card" style={{ textAlign: "left", marginBottom: "20px" }}>
        <h2>Search posts</h2>
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by title, author or status"
          style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "20px" }}>
        <div className="card">
          <h3>Total posts</h3>
          <p>{posts.length}</p>
        </div>
        <div className="card">
          <h3>Published</h3>
          <p>{publishedCount}</p>
        </div>
        <div className="card">
          <h3>Drafts</h3>
          <p>{draftCount}</p>
        </div>
      </div>

      <div className="card" style={{ textAlign: "left" }}>
        <h2>Results</h2>
        <div style={{ display: "grid", gap: "10px" }}>
          {filteredPosts.map((post) => (
            <div key={post.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px" }}>
              <strong>{post.title}</strong>
              <p style={{ marginTop: "4px" }}>By {post.author} · {post.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

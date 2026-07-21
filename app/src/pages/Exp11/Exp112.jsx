import { useEffect, useState } from "react";

const STORAGE_KEY = "exp112-drafts";

export default function Exp112() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const savedDrafts = window.localStorage.getItem(STORAGE_KEY);
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, []);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const nextDraft = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
    };

    const updatedDrafts = [nextDraft, ...drafts];
    setDrafts(updatedDrafts);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDrafts));
    setTitle("");
    setContent("");
  };

  return (
    <div className="container" style={{ maxWidth: "900px" }}>
      <h1>Draft Management Workflow</h1>
      <p className="subtitle">Experiment 1.1.2</p>

      <div style={{ display: "grid", gap: "20px", textAlign: "left" }}>
        <div className="card">
          <h2>Create a draft</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Draft title"
              style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Draft content"
              rows="5"
              style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
            <button className="btn" onClick={handleSave} style={{ border: "none", cursor: "pointer" }}>
              Save Draft
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Saved drafts</h2>
          {drafts.length === 0 ? (
            <p>No drafts yet.</p>
          ) : (
            <div style={{ display: "grid", gap: "10px" }}>
              {drafts.map((draft) => (
                <div key={draft.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px" }}>
                  <strong>{draft.title}</strong>
                  <p style={{ marginTop: "6px" }}>{draft.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

const roles = ["Viewer", "Editor", "Admin"];

export default function Exp132() {
  const [role, setRole] = useState("Viewer");

  return (
    <div className="container" style={{ maxWidth: "900px" }}>
      <h1>Role-Based Access Control</h1>
      <p className="subtitle">Experiment 1.3.2</p>

      <div className="card" style={{ textAlign: "left" }}>
        <h2>Select a role</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "12px" }}>
          {roles.map((entry) => (
            <button
              key={entry}
              className="btn"
              onClick={() => setRole(entry)}
              style={{ border: "none", cursor: "pointer", opacity: entry === role ? 1 : 0.7 }}
            >
              {entry}
            </button>
          ))}
        </div>
        <p style={{ marginTop: "16px" }}><strong>Current role:</strong> {role}</p>
        <p style={{ marginTop: "8px" }}>This demo shows how different access levels are granted based on the active role.</p>
      </div>
    </div>
  );
}

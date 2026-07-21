import { useMemo, useState } from "react";

const initialEvents = [
  { id: 1, title: "Sprint planning", completed: false, priority: "High" },
  { id: 2, title: "Retrospective", completed: true, priority: "Medium" },
  { id: 3, title: "Release prep", completed: false, priority: "High" },
];

export default function Exp142() {
  const [events] = useState(initialEvents);

  const stats = useMemo(() => {
    const total = events.length;
    const completed = events.filter((event) => event.completed).length;
    return { total, completed, pending: total - completed };
  }, [events]);

  return (
    <div className="container" style={{ maxWidth: "1000px" }}>
      <h1>Performance Optimized Calendar</h1>
      <p className="subtitle">Experiment 1.4.2</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "20px" }}>
        <div className="card">
          <h3>Total events</h3>
          <p>{stats.total}</p>
        </div>
        <div className="card">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
        <div className="card">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
      </div>

      <div className="card" style={{ textAlign: "left" }}>
        <h2>Event board</h2>
        <div style={{ display: "grid", gap: "10px", marginTop: "12px" }}>
          {events.map((event) => (
            <div key={event.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px" }}>
              <strong>{event.title}</strong>
              <p style={{ marginTop: "4px" }}>Priority: {event.priority}</p>
              <p style={{ marginTop: "4px" }}>{event.completed ? "Completed" : "Pending"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

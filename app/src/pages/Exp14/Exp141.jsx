import { useMemo, useState } from "react";

const initialEvents = [
  { id: 1, title: "Design review", day: "Mon", completed: false },
  { id: 2, title: "Content publish", day: "Wed", completed: true },
  { id: 3, title: "Campaign launch", day: "Fri", completed: false },
];

export default function Exp141() {
  const [events, setEvents] = useState(initialEvents);

  const completedCount = useMemo(() => events.filter((event) => event.completed).length, [events]);
  const pendingCount = events.length - completedCount;

  const toggleCompleted = (eventId) => {
    setEvents((currentEvents) => currentEvents.map((event) => event.id === eventId ? { ...event, completed: !event.completed } : event));
  };

  return (
    <div className="container" style={{ maxWidth: "1000px" }}>
      <h1>Interactive Post Scheduler</h1>
      <p className="subtitle">Experiment 1.4.1</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "20px" }}>
        <div className="card">
          <h3>Total events</h3>
          <p>{events.length}</p>
        </div>
        <div className="card">
          <h3>Completed</h3>
          <p>{completedCount}</p>
        </div>
        <div className="card">
          <h3>Pending</h3>
          <p>{pendingCount}</p>
        </div>
      </div>

      <div className="card" style={{ textAlign: "left" }}>
        <h2>Calendar view</h2>
        <div style={{ display: "grid", gap: "10px", marginTop: "12px" }}>
          {events.map((event) => (
            <div key={event.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px" }}>
              <div>
                <strong>{event.title}</strong>
                <p>{event.day}</p>
              </div>
              <button className="btn" onClick={() => toggleCompleted(event.id)} style={{ border: "none", cursor: "pointer", padding: "8px 12px" }}>
                {event.completed ? "Undo" : "Complete"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

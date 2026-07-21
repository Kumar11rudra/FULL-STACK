import React from "react";

function EventCard({ event, toggleCompleted }) {
  return (
    <div
      className="event-card"
      style={{
        borderLeft: `6px solid ${event.color}`
      }}
    >
      <h3>{event.title}</h3>

      <p>
        <strong>Date:</strong> {event.date}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {event.completed ? "Completed" : "Pending"}
      </p>

      <button
        className="toggle-btn"
        onClick={() => toggleCompleted(event.id)}
      >
        {event.completed ? "Mark Pending" : "Mark Completed"}
      </button>
    </div>
  );
}

export default React.memo(EventCard);

import EventCard from "./EventCard";

function Calendar({ events, toggleCompleted }) {
  return (
    <section className="calendar">
      <div className="event-grid">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </div>
    </section>
  );
}

export default Calendar;

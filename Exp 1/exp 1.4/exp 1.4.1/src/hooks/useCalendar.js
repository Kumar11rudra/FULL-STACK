import { useState } from "react";

const useCalendar = (initialEvents = []) => {

  const [events, setEvents] = useState(initialEvents);

  const addEvent = (event) => {
    setEvents((previous) => [
      ...previous,
      {
        ...event,
        id: Date.now().toString()
      }
    ]);
  };

  const updateEvent = (id, updatedData) => {
    setEvents((previous) =>
      previous.map((event) =>
        event.id === id
          ? { ...event, ...updatedData }
          : event
      )
    );
  };

  const deleteEvent = (id) => {
    setEvents((previous) =>
      previous.filter((event) => event.id !== id)
    );
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent
  };

};

export default useCalendar;

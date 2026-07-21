import { useState, useCallback } from "react";

const useCalendar = (initialEvents = []) => {

  const [events, setEvents] = useState(initialEvents);

  const addEvent = useCallback((event) => {

    setEvents(previous => [
      ...previous,
      {
        ...event,
        id: Date.now()
      }
    ]);

  }, []);

  const removeEvent = useCallback((id) => {

    setEvents(previous =>
      previous.filter(event => event.id !== id)
    );

  }, []);

  const toggleCompleted = useCallback((id) => {

    setEvents(previous =>
      previous.map(event =>
        event.id === id
          ? {
              ...event,
              completed: !event.completed
            }
          : event
      )
    );

  }, []);

  return {
    events,
    addEvent,
    removeEvent,
    toggleCompleted
  };

};

export default useCalendar;

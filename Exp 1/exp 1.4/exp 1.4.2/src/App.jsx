import { useState, useMemo, useCallback } from "react";

import "./App.css";

import Calendar from "./components/Calendar";
import Toolbar from "./components/Toolbar";
import StatsPanel from "./components/StatsPanel";

import sampleEvents from "./data/sampleEvents";

function App() {

  const [events, setEvents] = useState(sampleEvents);

  const totalEvents = useMemo(() => {
    return events.length;
  }, [events]);

  const completedEvents = useMemo(() => {
    return events.filter(event => event.completed).length;
  }, [events]);

  const pendingEvents = useMemo(() => {
    return totalEvents - completedEvents;
  }, [totalEvents, completedEvents]);

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

  return (

    <div className="app">

      <header className="header">

        <h1>
          Performance Optimized Calendar
        </h1>

        <p>
          Experiment 1.4.2
        </p>

      </header>

      <Toolbar />

      <StatsPanel
        total={totalEvents}
        completed={completedEvents}
        pending={pendingEvents}
      />

      <Calendar
        events={events}
        toggleCompleted={toggleCompleted}
      />

    </div>

  );

}

export default App;

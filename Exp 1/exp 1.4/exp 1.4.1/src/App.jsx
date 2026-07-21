import "./App.css";

import SchedulerCalendar from "./components/SchedulerCalendar";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <div className="app">

      <header className="header">
        <h1>Interactive Post Scheduler</h1>

        <p>
          Experiment 1.4.1 – Interactive Calendar Interface
        </p>
      </header>

      <Toolbar />

      <SchedulerCalendar />

    </div>
  );
}

export default App;

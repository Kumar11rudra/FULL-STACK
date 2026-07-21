import { Link } from "react-router-dom";

const subExperiments = [
  {
    title: "Experiment 1.4.1",
    description: "Interactive Post Scheduler",
    link: "/exp14/exp141",
  },
  {
    title: "Experiment 1.4.2",
    description: "Performance Optimized Calendar",
    link: "/exp14/exp142",
  },
];

export default function Exp14() {
  return (
    <div className="container">
      <h1>Experiment 1.4</h1>
      <p className="subtitle">Select a sub experiment.</p>

      <div className="grid">
        {subExperiments.map((experiment) => (
          <div key={experiment.title} className="card" style={{ textAlign: "left" }}>
            <h2>{experiment.title}</h2>
            <p>{experiment.description}</p>
            <Link to={experiment.link} className="btn">
              Open Experiment
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
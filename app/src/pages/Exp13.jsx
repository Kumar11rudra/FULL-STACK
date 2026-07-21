import { Link } from "react-router-dom";

const subExperiments = [
  {
    title: "Experiment 1.3.1",
    description: "JWT Authentication Flow",
    link: "/exp13/exp131",
  },
  {
    title: "Experiment 1.3.2",
    description: "Role-Based Access Control",
    link: "/exp13/exp132",
  },
];

export default function Exp13() {
  return (
    <div className="container">
      <h1>Experiment 1.3</h1>
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
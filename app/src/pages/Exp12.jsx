import { Link } from "react-router-dom";

const subExperiments = [
  {
    title: "Experiment 1.2.1",
    description: "Redux Toolkit State Management",
    link: "/exp12/exp121",
  },
  {
    title: "Experiment 1.2.2",
    description: "Memoized Selectors with Redux Toolkit",
    link: "/exp12/exp122",
  },
];

export default function Exp12() {
  return (
    <div className="container">
      <h1>Experiment 1.2</h1>
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
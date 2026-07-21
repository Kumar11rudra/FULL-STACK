import { Link } from "react-router-dom";

const subExperiments = [
    {
        title: "Experiment 1.1.1",
        description: "Dynamic Social Media Post Composer",
        link: "/exp11/exp111",
    },
    {
        title: "Experiment 1.1.2",
        description: "Draft Management Workflow",
        link: "/exp11/exp112",
    },
];

export default function Exp11() {
    return (
        <div className="container">
            <h1>Experiment 1.1</h1>
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